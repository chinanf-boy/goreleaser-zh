---
title: Scoop
series: customization
hideFromIndex: true
weight: 100
---
在发布到GitHub之后,GoReleaser可以生成并发布一个*Scoop App Manifest*进入您有权访问的存储库.

该`scoop`section指定应如何创建清单.请参阅下面的注释示例:

```yml
# .goreleaser.yml
scoop:
  # Template for the url.
  # Default is "https://github.com/<repo_owner>/<repo_name>/releases/download/{{ .Tag }}/{{ .ArtifactName }}"
  url_template: "http://github.mycompany.com/foo/bar/releases/{{ .Tag }}/{{ .ArtifactName }}"

  # Repository to push the app manifest to.
  bucket:
    owner: user
    name: scoop-bucket

  # Git author used to commit to the repository.
  # Defaults are shown.
  commit_author:
    name: goreleaserbot
    email: goreleaser@carlosbecker.com

  # Your app's homepage.
  # Default is empty.
  homepage: "https://example.com/"

  # Your app's description.
  # Default is empty.
  description: "Software to create fast and easy drum rolls."

  # Your app's license
  # Default is empty.
  license: MIT

  # Persist data between application updates
  persist:
  - "data"
  - "config.toml"
```

通过定义`scoop`部分,GoReleaser将负责发布Scoop应用程序.假设项目名称是`drumroll`而目前的标签是`v1.2.3`,上面的配置会生成一个`drumroll.json`清单显示在指定的存储库的根目录中`bucket`部分.

```json
{
  "version": "1.2.3",
  "architecture": {
    "64bit": {
      "url":
        "https://github.com/user/drumroll/releases/download/1.2.3/drumroll_1.2.3_windows_amd64.tar.gz",
      "bin": "drumroll.exe",
      "hash": "86920b1f04173ee08773136df31305c0dae2c9927248ac259e02aafd92b6008a"
    },
    "32bit": {
      "url":
        "https://github.com/user/drumroll/releases/download/1.2.3/drumroll_1.2.3_windows_386.tar.gz",
      "bin": "drumroll.exe",
      "hash": "283faa524ef41987e51c8786c61bb56658a489f63512b32139d222b3ee1d18e6"
    }
  },
  "homepage": "https://example.com/"
}
```

然后,您的用户可以执行以下操作来安装您

```sh
scoop bucket add app https://github.com/org/repo.git
scoop install app
```

你可以检查一下[Scoop文档](https://github.com/lukesampson/scoop/wiki)更多细节.
