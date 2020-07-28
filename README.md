# GoogleSpreadSheetToJson
간편하게 구글 스프레드 시트의 파일을 다운로드 받을 수 있고 Json으로 바꿀 수 있다.

### serviceAccountJson.json 준비하기
Cloud Platform 프로젝트를 만든 후 Google 스프레드 시트 API가 활성화되어 있어야 합니다.
[서비스 계정을 이용해서 사용하기](https://theoephraim.github.io/node-google-spreadsheet/#/getting-started/authentication?id=service-account)
위 과정을 통해 얻은 서비스 계정 인증 키 Json 파일을 serviceAccountJson.json 로 이름을 변경하여 프로젝트에 포함시킵니다.

### 예제
```
node app.js --csv true --json true
```