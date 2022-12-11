# emsdk-npm CI

## Secret Requirements

For the `check-emsdk` workflow, you need to set up a SSH key pair and assign it to this repo as a "deploy key".

Use the bash command `ssh-keygen`. Do not enter a passphrase because this workflow is automated.

Paste the public key (`id_rsa.pub`) into your Repo > Settings > Deploy keys.

Paste the private key (`id_rsa`) into your Repo > Settings > Secrets > New Repository Secret.

You also need to create a GitHub PAT and add that as a Repository Secret.

| Secret              | Description
|---------------------|------------
| `NPM_TOKEN`         | An NPM automation token to deploy onto the registry.
| `REPO_ACCESS_TOKEN` | A GitHub Personal Access Token with the `repo` scope. Used to trigger builds in the `deploy-npm` workflow.
| `SSH_PRIVATE_KEY`   | A SSH "deploy key" corresponding to this repo. Used to trigger builds in the `check-emsdk` workflow.

## Note on `package.json` version

The NPM version in the code is fixed as "0.3.0" to dodge merge conflicts with the `sdk-*` branches.

The actual package version is set from the tag name via the GitHub Actions runner, then deployed
onto NPM. The version change is not merged back into `master`.

## Branch Convention

| Branch           | Description
|------------------|------------
| `master`         | Latest code, not yet published to NPM. Tested.
| `npm-*` *or tag* | Code to be tested, deployed onto `emscripten-sdk-npm`, and merged into `sdk-` branches
| `sdk-*`          | Code to be tested, deployed onto `emscripten-sdk`

## Tag Convention

| Tag              | Description
|------------------|------------
| `v1.0.0`         | `emscripten-sdk` release, versioned to a specific Emscripten version.
| `1.0.0`          | `emscripten-sdk-npm` release, no version restrictions.
