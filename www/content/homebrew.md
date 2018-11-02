---
title: Homebrew
series: customization
hideFromIndex: true
weight: 90
---

在发布到GitHub之后,GoReleaser可以生成并发布一个*自制抽头*将食谱放入您有权访问的存储库中.

该`brew`section指定应如何创建公式.你可以检查一下[自制文件](https://github.com/Homebrew/brew/blob/master/docs/How-to-Create-and-Maintain-a-Tap.md)和[配方食谱](https://github.com/Homebrew/brew/blob/master/docs/Formula-Cookbook.md)更多细节.

```yml
# .goreleaser.yml
brew:
  # Name template of the recipe
  # Default to project name
  name: myproject

  # Repository to push the tap to.
  github:
    owner: user
    name: homebrew-tap

  # Template for the url.
  # Default is "https://github.com/<repo_owner>/<repo_name>/releases/download/{{ .Tag }}/{{ .ArtifactName }}"
  url_template: "http://github.mycompany.com/foo/bar/releases/{{ .Tag }}/{{ .ArtifactName }}"

  # Allows you to set a custom download strategy.
  # Default is empty.
  download_strategy: GitHubPrivateRepositoryReleaseDownloadStrategy

  # Git author used to commit to the repository.
  # Defaults are shown.
  commit_author:
    name: goreleaserbot
    email: goreleaser@carlosbecker.com

  # Folder inside the repository to put the formula.
  # Default is the root folder.
  folder: Formula

  # Caveats for the user of your binary.
  # Default is empty.
  caveats: "How to use this binary"

  # Your app's homepage.
  # Default is empty.
  homepage: "https://example.com/"

  # Your app's description.
  # Default is empty.
  description: "Software to create fast and easy drum rolls."

  # Setting this will prevent goreleaser to actually try to commit the updated
  # formula - instead, the formula file will be stored on the dist folder only,
  # leaving the responsibility of publishing it to the user.
  # Default is false.
  skip_upload: true

  # Packages your package depends on.
  dependencies:
    - git
    - zsh

  # Packages that conflict with your package.
  conflicts:
    - svn
    - bash

  # Specify for packages that run as a service.
  # Default is empty.
  plist: |
    <?xml version="1.0" encoding="UTF-8"?>
    ...

  # So you can `brew test` your formula.
  # Default is empty.
  test: |
    system "#{bin}/program --version"
    ...

  # Custom install script for brew.
  # Default is 'bin.install "program"'.
  install: |
    bin.install "program"
    ...
```

> 了解有关的更多信息[名称模板引擎](/templates).

通过定义`brew`部分,GoReleaser将负责发布Homebrew水龙头.假设当前标签是`v1.2.3`,上面的配置会生成一个`program.rb`公式中`Formula`的文件夹`user/homebrew-tap`库:

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

**重要**:请注意,GoReleaser尚未生成有效的自制核心公式.生成的公式旨在发布为[自制水龙头](https://docs.brew.sh/Taps.html),并且目前的形式不会被任何官方自制软件库接受.
