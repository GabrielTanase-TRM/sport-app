export {};
// import type { Account } from "$server/types";
// import { z } from "zod";
// import cuid from "cuid";
// import http from "$server/http";
// import { schema as zProfile } from "$schemas/profile";
// import { IdentityType } from "$schemas/identity";
// import { AccountType } from "$schemas/account";
// import { zPassword } from "$server/validate";
// import identities from "$server/services/identities";
// import accounts from "$server/services/accounts";
// import profiles from "$server/services/profiles";
// import mailer from "$server/services/mailer";
// import errors from "$server/errors";
// import CONFIG from "$server/config";

// http.addHook("onRoute", (route) => {
//   route.preValidation = async (request) => {
//     const query = request.query as any;
//     // bypass auth for request with platform access tokens
//     if (query?.token) {
//       if (query.token === CONFIG.PLATFORM_ACCESS_TOKEN) return;
//       if (query.token === CONFIG.PLATFORM_MULTISOFT) return;
//     }
//     // get account id from session
//     const accountId = request.session.get("account.id");
//     // if no session, check if public or throw
//     if (!accountId) {
//       if (route.public) return;
//       else throw errors.notAuthenticated();
//     }
//     // get linked account from database
//     const account = await accounts.getBy(
//       { id: accountId, status: "ACTIVE" },
//       { profile: true }
//     );
//     if (route.public) {
//       if (account) {
//         // set active account on request
//         request.account = account as Account;
//       } else {
//         // invalid session, destroy it
//         request.session.delete();
//       }
//     } else {
//       if (!account) {
//         // invalid session, destroy it
//         request.session.delete();
//         throw errors.notAuthenticated();
//       }
//       // system account has full permissions
//       if (account.type === AccountType.SYSTEM) {
//         // set active account on request
//         request.account = account as Account;
//       } else {
//         // check permissions if guars are set
//         if (route.deny && route.deny.includes(account.type)) {
//           throw errors.forbidden();
//         }
//         if (route.allow && !route.allow.includes(account.type)) {
//           throw errors.forbidden();
//         }
//         // set active account on request
//         request.account = account as Account;
//       }
//     }
//   };
// });
// export type Register = z.infer<typeof zRegister>;
// const zRegister = zProfile.extend({
//   status: z.enum(["ACTIVE", "PENDING"]),
//   role: z.enum(["OWNER", "MANAGER", "CLERK", "OPERATOR", "CLIENT"]),
//   password: zPassword,
// });
// http.route<{ Body: Register }>({
//   public: true,
//   method: "POST",
//   url: "/api/register",
//   async handler({ body }, reply) {
//     const { email, password, status, role, ...data } = zRegister.parse(body);
//     const accountId = cuid();
//     const profileId = cuid();
//     const profile = await profiles.create({
//       ...data,
//       email,
//       accountId,
//       id: profileId,
//     });
//     const account = await accounts.create({
//       email,
//       status,
//       profileId,
//       type: role,
//       id: accountId,
//     });
//     try {
//       const identity = await identities.create({
//         type: IdentityType.PASSWORD,
//         identifier: account.email,
//         token: password,
//         accountId,
//       });
//       if (account.status !== "ACTIVE") {
//         const link = `${CONFIG.PLATFORM_DOMAIN}/auth/password-reset?token=${identity.id}`;
//         await mailer.send({
//           template: "account_activate",
//           to: email,
//           subject: "Activează-ți contul",
//           data: { LINK: link },
//         });
//       }
//     } catch (error) {
//       // remove the created records
//       await accounts.remove(accountId);
//       await profiles.remove(accountId);
//       throw error;
//     }
//     reply.send({ ...account, profile });
//   },
// });
// // send an email to activate the account
// http.route<{ Body: { id: string } }>({
//   public: true,
//   method: "POST",
//   url: "/api/register/email",
//   async handler({ body }, reply) {
//     const account = await accounts.get(body.id);
//     if (!account) throw errors.recordNotFound();
//     if (account.status !== "PENDING")
//       throw errors.invalid("Contul nu poate fi activat");
//     const identity = await identities.getBy({ accountId: account.id });
//     if (!identity) throw errors.invalid("Contul nu poate fi activat");
//     const link = `${CONFIG.PLATFORM_DOMAIN}/auth/password-reset?token=${identity.id}`;
//     await mailer.send({
//       template: "account_activate",
//       to: account.email,
//       subject: "Activează-ți contul",
//       data: { LINK: link },
//     });
//     reply.send({ ok: 1 });
//   },
// });
// type Login = z.infer<typeof zLogin>;
// const zLogin = z.object({
//   email: z.string().email(),
//   password: z.string(),
// });
// http.route<{ Body: Login }>({
//   public: true,
//   method: "POST",
//   url: "/api/login",
//   async handler({ body, session }, reply) {
//     const { email, password } = zLogin.parse(body);
//     // no need to check for errors as they
//     // are thrown by the identify method
//     const account = await identities.identify({
//       identifier: email,
//       token: password,
//     });
//     // set the logged in account session
//     session.set("account.id", account.id);
//     reply.send({ id: account.id, email: email });
//   },
// });
// http.route({
//   public: true,
//   method: "GET",
//   url: "/api/logout",
//   async handler({ session }, reply) {
//     session.delete(); // destroy session
//     reply.send({ ok: 1 });
//   },
// });
// // chance account password
// type PasswordUpdate = z.infer<typeof zPasswordUpdate>;
// const zPasswordUpdate = z.object({ password: z.string(), id: z.string() });
// http.route<{ Body: PasswordUpdate }>({
//   method: "POST",
//   url: "/api/password/update",
//   async handler({ body, account: session }, reply) {
//     const isClient = session?.type === "CLIENT";
//     const account = await accounts.get(
//       isClient && session?.id ? session.id : body.id
//     );
//     if (!account) throw errors.recordNotFound();
//     const identity = await identities.getBy({ accountId: account.id });
//     if (identity) {
//       if (identity.type !== "PASSWORD") {
//         throw errors.invalid(`Tipul identității nu este 'PASSWORD'`);
//       }
//       const result = await identities.update(identity.id, {
//         type: identity.type,
//         token: body.password,
//       });
//       reply.send(result);
//     } else {
//       const result = await identities.create({
//         type: "PASSWORD",
//         accountId: account.id,
//         identifier: account.email,
//         token: body.password,
//       });
//       reply.send(result);
//     }
//   },
// });
// // send an email to initiate password reset
// type PasswordResetEmail = z.infer<typeof zPasswordResetEmail>;
// const zPasswordResetEmail = z.object({ email: z.string().email() });
// http.route<{ Body: PasswordResetEmail }>({
//   public: true,
//   method: "POST",
//   url: "/api/password/reset/email",
//   async handler({ body, session }, reply) {
//     const { email } = zPasswordResetEmail.parse(body);
//     const identity = await identities.getBy({
//       identifier: email,
//     });
//     if (!identity || identity.type !== "PASSWORD") {
//       throw errors.invalid(`Email-ul nu corespunde vreunui cont`);
//     }
//     const link = `${CONFIG.PLATFORM_DOMAIN}/auth/password-reset?token=${identity.id}`;
//     await mailer.send({
//       template: "password_reset",
//       data: { LINK: link },
//       to: email,
//       subject: "Resetează parola contului",
//     });
//     reply.send({ ok: 1 });
//   },
// });
// // reset the password by token
// type PasswordReset = z.infer<typeof zPasswordReset>;
// const zPasswordReset = z.object({
//   token: z.string().min(25),
//   password: z.string(),
// });
// http.route<{ Body: PasswordReset }>({
//   public: true,
//   method: "POST",
//   url: "/api/password/reset",
//   async handler({ body, session }, reply) {
//     const { token, password } = zPasswordReset.parse(body);
//     const identity = await identities.get(token);
//     const account = await accounts.getBy({ id: identity?.accountId });
//     if (!identity || !account)
//       throw errors.invalid(`Token-ul de resetare este invalid`);
//     await identities.update(identity.id, {
//       type: "PASSWORD",
//       token: password,
//     });
//     // activate account if is pending
//     if (account.status === "PENDING") {
//       await accounts.update(account.id, { status: "ACTIVE" });
//     }
//     // auto-login after password reset
//     session.set("account.id", identity.accountId);
//     reply.send({ ok: 1 });
//   },
// });
// // get logged in account
// http.route({
//   method: "GET",
//   url: "/api/session",
//   async handler({ account }, reply) {
//     if (account) reply.send(account);
//     else throw errors.notAuthenticated();
//   },
// });
