---
title: Homebrew
series: customization
hideFromIndex: true
weight: 90
---

在发布到GitHub之后,GoReleaser可以生成，并发布一个*homebrew-tap*食谱放入您有权访问的存储库中.

该`brew`部分指定应如何创建配方。你可以查看一下[Homebrew文档](https://github.com/Homebrew/brew/blob/master/docs/How-to-Create-and-Maintain-a-Tap.md)和[配方-formula，食谱-cookbook](https://github.com/Homebrew/brew/blob/master/docs/Formula-Cookbook.md)更多细节.

```yml
# .goreleaser.yml
brew:
  # 食谱的名称模板
  # 默认为项目名称
  name: myproject

  # 用于push 的 tap存储库。
  github:
    owner: user
    name: homebrew-tap

  # 网址模板。
  # 默认为 "https://github.com/<repo_owner>/<repo_name>/releases/download/{{ .Tag }}/{{ .ArtifactName }}"
  url_template: "http://github.mycompany.com/foo/bar/releases/{{ .Tag }}/{{ .ArtifactName }}"

  # 允许您设置自定义下载策略。
  # 默认为空。
  download_strategy: GitHubPrivateRepositoryReleaseDownloadStrategy

  # 提交存储库的 Git作者。
  # 显示默认值。
  commit_author:
    name: goreleaserbot
    email: goreleaser@carlosbecker.com

  # 存储库中，放置配方的文件夹。
  # 默认为根文件夹。
  folder: Formula

  # 为二进制文件的用户提供警告。
  # 默认为空。
  caveats: "How to use this binary"

  # 您应用的主页。
  # 默认为空。
  homepage: "https://example.com/"

  # 你的应用程序的描述。
  # 默认为空。
  description: "Software to create fast and easy drum rolls."

  # 设置此项，将阻止goreleaser实际提交更新配方
  # 替代为，配方文件仅存储在dist文件夹中，
  # 将push的责任给用户。
  # 默认值为false。
  skip_upload: true

  # 你的包所依赖的包。
  dependencies:
    - git
    - zsh

  # 与您的包冲突的包。
  conflicts:
    - svn
    - bash

  # 指定作为服务运行的包。
  # 默认为空。
  plist: |
    <?xml version="1.0" encoding="UTF-8"?>
    ...

  # 你可以"brew test"你的配方。
  # 默认为空。
  test: |
    system "#{bin}/program --version"
    ...

  # brew的自定义安装脚本。
  # 默认为'bin.install "program"'。
  install: |
    bin.install "program"
    ...
```

> 了解有关[命名模板引擎](/templates)的更多信息.

通过定义`brew`部分,GoReleaser将负责发布Homebrew tap.假设当前标签是`v1.2.3`,上面的配置会生成一个`program.rb`配方, 其在`user/homebrew-tap`库的`Formula`文件夹中:

```rb
class Program < Formula
  desc "How to use this binary"
  homepage "https://github.com/user/repo"
  url "https://github.com/user/repo/releases/download/v1.2.3/program_v1.2.3_macOs_64bit.zip"
  version "v1.2.3"
  sha256 "9ee30fc358fae8d248a2d7538957089885da321dca3f09e3296fe2058e7fff74"

  depends_on "git"
  depends_on "zsh"

  def install
    bin.install "program"
  end
end
```

**重点**:请注意,GoReleaser尚未生成有效的homebrew-core配方.生成的配方旨在发布为[homebrew taps](https://docs.brew.sh/Taps.html)，并且目前的形式不会被任何官方brew软件库接受.
