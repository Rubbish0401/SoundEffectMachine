```
machine.html
data
├ preferences.jsonp
└ profiles
　└ {プロファイルのフォルダ名}
　　├ profile.jsonp
　　├ sounds
　　└ icons
```
machine.html, data, profile.jsonp, sounds, iconsは名前変更不可

```
build({
	"view": "grid",  // or "list"

	"initial": 0,
	"profiles": [
    "{プロファイルのフォルダ名}"
	]
});
```
{プロファイルのフォルダ名}は省略不可

```
loadProfile({
  "name": "{プロファイルの名前}",
  "sounds": [
    {"name": "{音源の名前}", "path": "{音源のパス}", "icon": "{音源のアイコンのパス}"}
  ]
});
```
{音源のパス}は省略不可
{プロファイルの名前}, {音源の名前}, {音源アイコンのパス}は省略可

OBSのcustom browser dockでmachine.htmlを読み込むと便利かも。

# おまけ(スクショ)
![image](https://github.com/user-attachments/assets/fae4115d-ef22-434d-888d-d2763fa0d7b7)
![image](https://github.com/user-attachments/assets/c7d93f97-4f3e-4018-bf2a-85ccfdaa6659)
