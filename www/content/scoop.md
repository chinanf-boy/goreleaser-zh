---
title: Scoop
series: customization
hideFromIndex: true
weight: 100
---

在发布到GitHub之后,GoReleaser可以生成,并发布一个 *Scoop App Manifest* 到您有权访问的存储库.

该`scoop`部分指定应如何创建清单。请参阅下面的注释示例:

```yml
# .goreleaser.yml
scoop:
  # 网址模板。
  # 默认为"https://github.com/<repo_owner>/<repo_name>/releases/download/{{ .Tag }}/{{ .ArtifactName }}"
  url_template: "http://github.mycompany.com/foo/bar/releases/{{ .Tag }}/{{ .ArtifactName }}"

  # 将应用清单推送到的存储库。
  bucket:
    owner: user
    name: scoop-bucket

  # 提交存储库的Git作者。
  # 显示默认值。
  commit_author:
    name: goreleaserbot
    email: goreleaser@carlosbecker.com

  # 您应用的主页。
  # 默认为空。
  homepage: "https://example.com/"

  # 你的应用程序的描述。
  # 默认为空。
  description: "Software to create fast and easy drum rolls."

  # 你的应用许可证
  # 默认为空。
  license: MIT

  # 在应用程序更新之间，保留的数据
  persist:
  - "data"
  - "config.toml"
```

通过定义`scoop`部分,GoReleaser将负责发布Scoop应用程序。假设项目名称是`drumroll`且目前的标签是`v1.2.3`,上面的配置会生成一个`drumroll.json`清单，显示在`bucket`字段指定的存储库根目录.

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

然后,您的用户可以执行以下操作来安装您应用

```sh
scoop bucket add app https://github.com/org/repo.git
scoop install app
```

你可以查看一下[Scoop文档](https://github.com/lukesampson/scoop/wiki)更多细节.
