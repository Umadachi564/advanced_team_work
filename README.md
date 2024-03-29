## アプリの概要
- ミリオネア風のクイズアプリ
- クイズ内容: 大阪公立大学に関わるクイズ

## 工夫した点
1. 本家により近づけるために, 音を追加したり50:50, オーディエンス, テレフォン(簡易版)機能(以下, オプション機能)とUIを追加した
2. フロントエンドだけで完結したものにすると, JavaScript(React)のコードが冗長になり保守が困難であるため, フロントエンドとバックエンドに分割
3. バックエンド側でAPIを実装し, フロントエンドはAPIを使うだけでクイズデータを取得できたり, オプション機能を利用できるようにした. 

## 事前準備
1. Dockerの環境構築を行ってください
2. Open AI API(https://platform.openai.com/docs/overview)のAPI keysでAPI Keyを作成してください. (会員登録必須)
3. 一番上の階層(docker-compose.yamlがある階層)に.envファイルを追加してください
4. 3で作った.envファイルに API_KEY = "your Open AI API Key" (2で作ったOPen AI API key)という文言を追加してください

## 問題の登録方法
`problems.json`に直接書いてください。フォーマットはissue#7参照。  
#シェルスクリプトを用いて問題の更新を行う場合、
すべてのコンテナが立ち上がってからadvanced_team_workのディレクトリで、以下のコマンドを入力してください。
`chmod +x run_insert_data.sh`
`./run_insert_data.sh`
これで問題が更新されるはずです。また、クイズのidは他のものと被らないように注意してください。被るとデータベースに挿入できません。

#シェルスクリプトを使わずに問題の更新を行う場合
すべてのコンテナを立ち上げた後、以下のコマンドを実行してください
`docker exec -it api sh -c "python /usr/src/server/insert_data.py"`
`docker restart api`

## 利用方法
1. このリポジトリをcloneしてくる
2. `docker-compose up `
3. 数分待つと, `localhost:3000`という表示が出てくるので, それを押すと遊べます. 

<!-- ## 参考にしたYouTubeの動画
https://youtu.be/EPh_VbMxu4E?si=9CuWLLEMnhnsziqB -->

<!-- 実際にはDBを立ててそちらに登録する必要がありますが、これは`python3 scripts/problem_register.py`(仮)をサーバ上で実行すれば良いです。  
問題をDBに登録する前に、`python3 scripts/check_problems.py`を実行してください。JSONファイルに登録されている情報がフォーマットを満たしているのかを自動でチェックしてくれます。(TODO : problem_register.pyから自動でチェックするようにする。あるいは2つを連続で走らせるシェルスクリプトを書く) -->

<!-- # Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify) -->
