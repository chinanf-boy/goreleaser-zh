---
title: Snapcraft
series: customization
hideFromIndex: true
weight: 81
---
GoReleaser也可以生成`snap`包.[snapcraft](http://snapcraft.io/)是一种新的打包格式,可以让您将项目直接发布到Ubuntu商店。从那里它将安装在所有的[支持的Linux发行版](https://snapcraft.io/docs/core/install)，具有自动和更新事件。

你可以在[snapcraft 文档](https://snapcraft.io/docs/)中阅读更多相关信息.

可用选项:

```yml
# .goreleaser.yml
snapcraft:
  # 您可以更改包的名称。
  # Default: `{{ .ProjectName }}_{{ .Version }}_{{ .Os }}_{{ .Arch }}{{ if .Arm }}v{{ .Arm }}{{ end }}`
  name_template: "{{ .ProjectName }}_{{ .Version }}_{{ .Os }}_{{ .Arch }}"

  # 替换包名称中的 GOOS和GOARCH。
  # key 应该是有效的 GOOS或GOARCH。
  # value 是各自的替代品。
  # 默认值为空。
  replacements:
    amd64: 64-bit
    386: 32-bit
    darwin: macOS
    linux: Tux

  # snap的名称。这是可选的。
  # 默认为项目名称。
  name: drumroll

  # 然后将snap发布到snapcraft商店。
  # 请记住，您首先需要`snapcraft login`。
  # 默认值为false。
  publish: true

  # 您提供了惊人的snap软件。
  # 最多79个字符。
  summary: Software to create fast and easy drum rolls.

  # 这是您的snap的描述。你有一两段话要告诉你
  # 关于snap的最重要的故事。保持在100字以内，
  # 我们住在推文空间，你的描述希望在短时间内看起来很好
  # 商店。
  description: |
    这是最好的滚筒应用。
     安装它，愉快！

  # 在它准备好了，将snap发布给所有用户之前的挡板，
  # `devel`将让你只发布到'edge`和'beta`版本到商店
  # `stable`也会让你发布`candidate`和`stable`版本
  # 有关该频道的更多信息：
  # Https://snapcraft.io/docs/reference/channels
  grade: stable

  # 您可以设置snap，以遵循三种不同的限制策略：
  # `strict`，`devmode`和`classic`。
  # 快速严格的限制建议仅在您自己的命名空间中进行读写。
  # 额外严格捕获的权限可以声明为应用程序的“插件”，这里
  # 我稍后会解释。有关限制的更多信息：
  # Https://snapcraft.io/docs/reference/confinement
  confinement: strict

  # GoReleaser构建的每个二进制文件都是snap中的应用程序。在这一部分
  # 您可以声明这些二进制文件的其他详细信息。这是可选的。
  apps:

    # 应用程序的名称必须，与二进制构建的名称或snap的名称相同。
    drumroll:

      # 如果您的应用需要其他权限，才能在其默认值之外工作
      # 下面空间中，宣布它们。
      # 您可以阅读有关可用插头的文档
      # 允许的可用内容：
      # Https://snapcraft.io/docs/reference/interfaces。
      plugs: ["home", "network"]

      # 如果您希望自己的应用始终自动后台启动
      # 你可以使它成为一个简单的守护进程。
      daemon: simple

      # 如果要将args传递给二进制文件，可以使用
      # Args选项。
      args: --foo
```

> 了解有关[命名模板引擎](/templates)的更多信息.

请注意,GoReleaser不会安装`snapcraft`，或它的任何依赖.
