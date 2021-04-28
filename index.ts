import * as DIDKit from "didkit";
import type { VerifyResult, Options } from "didkit";

let version: string = DIDKit.getVersion();

const key = {
  kty: "OKP",
  crv: "Ed25519",
  x: "PBcY2yJ4h_cLUnQNcYhplu9KQQBNpGxP4sYcMPdlu6I",
  d: "n5WUFIghmRYZi0rEYo2lz-Zg2B9B1KW4MYfJXwOXfyI",
};

let did: string = DIDKit.keyToDID("key", key);
let verificationMethod: string = DIDKit.keyToVerificationMethod("key", key);

let verifyResult: VerifyResult;

let assertionOptions: Options = {
  proofPurpose: "assertionMethod",
  verificationMethod: verificationMethod,
};

let authenticationOptions: Options = {
  proofPurpose: "authentication",
  verificationMethod: verificationMethod,
};

// Issue/Verify Credential
const credential = DIDKit.issueCredential(
  {
    "@context": "https://www.w3.org/2018/credentials/v1",
    id: "http://example.org/credentials/3731",
    type: ["VerifiableCredential"],
    issuer: did,
    issuanceDate: "2020-08-19T21:41:50Z",
    credentialSubject: {
      id: "did:example:d23dd687a7dc6787646f2eb98d0",
    },
  },
  assertionOptions,
  key
);

verifyResult = DIDKit.verifyCredential(credential, {
  proofPurpose: "assertionMethod",
});

// Issue/Verify Presentation
const presentation = DIDKit.issuePresentation(
  {
    "@context": ["https://www.w3.org/2018/credentials/v1"],
    id: "http://example.org/presentations/3731",
    type: ["VerifiablePresentation"],
    holder: did,
    verifiableCredential: credential,
  },
  authenticationOptions,
  key
);

verifyResult = DIDKit.verifyPresentation(presentation, {
  proofPurpose: "authentication",
});

// Issue/Verify DIDAuth Presentation
const didAuth = DIDKit.DIDAuth(
  did,
  {
    proofPurpose: "authentication",
    verificationMethod,
  },
  key
);

verifyResult = DIDKit.verifyPresentation(presentation, {
  proofPurpose: "authentication",
});
