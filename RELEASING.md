# Releasing

> **Releases are managed by repository owners**

## Steps

1. Create a pull request for each development
1. Add a label to each pull request
1. Create a new version from `main` with `npx lerna version`
1. `release` workflow will attach the release notes to a brand new draft release
1. [ *only pre-release* ] Flag the release with `This is a pre-release`
1. Manually publish the release from GitHub
1. `publish` workflow will publish the release to NPM registry
