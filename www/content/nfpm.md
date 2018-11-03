---
title: NFPM
series: customization
hideFromIndex: true
weight: 80
---

GoReleaser可以连到[nfpm](https://github.com/goreleaser/nfpm)，生成和发布`.deb`和`.rpm`包.

可用选项:

```yml
#.goreleaser.yml
nfpm:
  # 包名
  # Default: `{{ .ProjectName }}_{{ .Version }}_{{ .Os }}_{{ .Arch }}{{ if .Arm }}v{{ .Arm }}{{ end }}`
  name_template: "{{ .ProjectName }}_{{ .Version }}_{{ .Os }}_{{ .Arch }}"

  # 替换 存档名称中的 GOOS 和 GOARCH.
  # Keys 应为合法 GOOSs 或 GOARCHs.
  # Values 应为 恰当的替代名称.
  # 默认是 空.
  replacements:
    amd64: 64-bit
    386: 32-bit
    darwin: macOS
    linux: Tux

  # 你应用的 vendor.
  # 默认为 空
  vendor: Drum Roll Inc.
  # 你应用的 homepage.
  # 默认为 空
  homepage: https://example.com/

  # 你应用的 主项目人 (可能时 you).
  # 默认为 空
  maintainer: Drummer <drum-roll@example.com>

  # 你应用的 描述.
  # 默认为 空
  description: Software to create fast and easy drum rolls.

  # 你应用的 license.
  # 默认为 空
  license: Apache 2.0

  # 生成格式.
  formats:
    - deb
    - rpm

  # 你包所依赖的包。
  dependencies:
    - git
    - zsh

  # 软件包建议安装的软件包。
  # 对于RPM软件包，需要rpmbuild >= 4.13
  recommends:
    - bzr
    - gtk

  # 软件包建议安装的软件包。
  # 对于RPM软件包，需要rpmbuild >= 4.13
  suggests:
    - cvs
    - ksh

  # 与您的包冲突的包。
  conflicts:
    - svn
    - bash

  # 覆盖二进制文件的默认目的地为 /usr/local/bin
  bindir: /usr/bin

  # 应该由你程序实现创建和管理的空文件夹。
  # 默认为空
  empty_folders:
  - /var/log/foobar

  # 要添加到包中的文件或目录（超出二进制文件）。
  # Key 是从 源 路径/globs 中获取文件。
  # Value 是包中文件的目标位置。
  files:
    "scripts/etc/init.d/": "/etc/init.d"
    "path/**/glob": "/var/foo/glob"

  # 要添加到包中的配置文件。它们大致与上面fiels相同
  # ，但包管理器对待它们方式不同（同时
  # 卸载，主要是）。
  # Key 是从 源 路径/globs 中获取文件。
  # Value 是包中文件的目标位置。
  config_files:
    "tmp/app_generated.conf": "/etc/app.conf"
    "conf/*.conf": "/etc/foo/"

  # 在安装包期间执行的脚本。
  # Key 是安装过程的阶段
  # Values 是将要执行的脚本的路径
  scripts:
    preinstall: "scripts/preinstall.sh"
    postinstall: "scripts/postinstall.sh"
    preremove: "scripts/preremove.sh"
    postremove: "scripts/postremove.sh"

  # 每个包格式，可以覆盖一些属性。
  overrides:
    deb:
      conflicts:
        - subversion
      dependencies:
        - git
      suggests:
        - gitk
      recommends:
        - tig
      empty_folders:
      - /var/log/bar
    rpm:
      replacements:
        amd64: x86_64
      name_template: "{{ .ProjectName }}-{{ .Version }}-{{ .Arch }}"
      files:
        "tmp/man.gz": "/usr/share/man/man8/app.8.gz"
      config_files:
        "tmp/app_generated.conf": "/etc/app-rpm.conf"
      scripts:
        preinstall: "scripts/preinstall-rpm.sh"
```

> 了解有关[命名模板引擎](/templates)的更多信息.

请注意,GoReleaser不会为你安装`rpmbuild`或任何依赖.就目前而言,如果要生成rpm包，`rpmbuild`是需要的, 建议使用`apt-get install rpm`要么`brew install rpm`安装它.
