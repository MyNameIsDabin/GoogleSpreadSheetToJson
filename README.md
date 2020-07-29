# GoogleSpreadSheetToJson
간편하게 구글 스프레드 시트의 파일을 다운로드 받을 수 있고 Json으로 바꿀 수 있다.

### serviceAccountJson.json 준비하기
Cloud Platform 프로젝트를 만든 후 Google 스프레드 시트 API가 활성화되어 있어야 합니다.
[서비스 계정을 이용해서 사용하기](https://theoephraim.github.io/node-google-spreadsheet/#/getting-started/authentication?id=service-account)
를 통해 얻은 서비스 계정 인증 키 Json 파일을 serviceAccountJson.json 로 이름을 변경하여 프로젝트에 포함시킵니다.

### config.json 에 시트 정보 추가하기
```
{
    "<스프레드 시트 A ID>": {
        "SheetA": {
            "csv" : "SheetA.csv",
            "json" : "SheetA.json"
        },
        "SheetB": {
            "csv" : "SheetB.csv",
            "json" : "SheetB.json"
        }
    },
    "<스프레드 시트 B ID>": {
        "SheetA": {
            "csv" : "SheetA.csv"
        },
        "SheetB": {
            "csv" : "SheetB.csv"
        }
    }
}
```
https://docs.google.com/spreadsheets/d/<이 부분에 있는게 스프레드 시트 ID>/edit#gid=0
시트 ID 정보는 URL로 부터 얻을 수 있습니다.

### 예제
```
node app.js --csv --json
```

### Error: Google API error - [403] The caller does not have permission
스프레드 시트 -> 우측 상단 공유 버튼 -> 서비스 계정 이메일 공유