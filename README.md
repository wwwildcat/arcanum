## Arcanum

A sample local Git web interface. Based on homework for [15th Yandex Interface Development School](https://academy.yandex.ru/schools/frontend) (2019, autumn).

Created with [create-next-app](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

### Features

- listing local repos and switching between them
<img src="screenshots/select_repo.png" alt="screenshots/select_repo.png" width="1024"/>
<img src="screenshots/select_repo_1.png" alt="screenshots/select_repo_1.png" width="1024"/>
<p>
    <img src="screenshots/select_repo_m.png" alt="screenshots/select_repo_m.png" width="320"/>
    <img src="screenshots/select_repo_1_m.png" alt="screenshots/select_repo_1_m.png" width="320"/>
</p>

- file structure explorer to browse all files and folders within the repo
<p>
    <img src="screenshots/table.png" alt="screenshots/table.png" width="75%"/>
    <img src="screenshots/table_m.png" alt="screenshots/table_m.png" width="24%"/>
</p>

- file viewer to show file content and file size
<img src="screenshots/file_viewer.png" alt="screenshots/file_viewer.png" width="1024"/>

- last commit info for selected file or folder
- listing local branches (both for the entire repo and for its files and subfolders) and switching between them
<img src="screenshots/select_branch.png" alt="screenshots/select_branch.png" width="1024"/>
<img src="screenshots/select_branch_1.png" alt="screenshots/select_branch_1.png" width="1024"/>
<img src="screenshots/branches.png" alt="screenshots/branches.png" width="1024"/>
<p>
    <img src="screenshots/select_branch_m.png" alt="screenshots/select_branch_m.png" width="32%"/>
    <img src="screenshots/select_branch_1_m.png" alt="screenshots/select_branch_1_m.png" width="32%"/>
    <img src="screenshots/branches_m.png" alt="screenshots/branches_m.png" width="32%"/>
</p>

### Technologies

- [Next.js](https://github.com/vercel/next.js/)
- [TypeScript](https://github.com/Microsoft/TypeScript)
- [Redux](https://github.com/reduxjs/redux)
- [react-redux](https://github.com/reduxjs/react-redux)
- [redux-thunk](https://github.com/reduxjs/redux-thunk)
- [node-sass](https://github.com/sass/node-sass)

### Requirements

- [NodeJS](https://nodejs.org/en/) ^14.x
- [Git](https://git-scm.com/) ^2.29

### Usage & development

0. Install [yarn](https://classic.yarnpkg.com/en/docs/install) if needed.
1. `git clone https://github.com/wwwildcat/shri-arcanum.git`
2. Create a file called `.env` on the root of the project and add the `BASE_PATH` variable:
```
BASE_PATH='path'
```
where `path` is your absolute path to local directory that contains Git repositories, example: `/home/user/repos`.

3. `yarn install`
4. `yarn dev`
5. URL: [http://localhost:3000](http://localhost:3000)

### Unit testing

```
yarn test
```

Using [Jest](https://github.com/facebook/jest), [react-testing-library](https://github.com/testing-library/react-testing-library), [jest-dom](https://github.com/testing-library/jest-dom) with [redux-mock-store](https://github.com/reduxjs/redux-mock-store), [node-mocks-http](https://github.com/howardabrams/node-mocks-http) and [jest-fetch-mock](https://github.com/jefflau/jest-fetch-mock).