---
title: NFPM
series: customization
hideFromIndex: true
weight: 80
---
GoReleaser可以连接到[nfpm](https://github.com/goreleaser/nfpm)生成和发布`.deb`和`.rpm`包.

可用选项:

```yml
# .goreleaser.yml
nfpm:
  # You can change the name of the package.
  # Default: `{{ .ProjectName }}_{{ .Version }}_{{ .Os }}_{{ .Arch }}{{ if .Arm }}v{{ .Arm }}{{ end }}`
  name_template: "{{ .ProjectName }}_{{ .Version }}_{{ .Os }}_{{ .Arch }}"

  # Replacements for GOOS and GOARCH in the package name.
  # Keys should be valid GOOSs or GOARCHs.
  # Values are the respective replacements.
  # Default is empty.
  replacements:
    amd64: 64-bit
    386: 32-bit
    darwin: macOS
    linux: Tux

  # Your app's vendor.
  # Default is empty.
  vendor: Drum Roll Inc.
  # Your app's homepage.
  # Default is empty.
  homepage: https://example.com/

  # Your app's maintainer (probably you).
  # Default is empty.
  maintainer: Drummer <drum-roll@example.com>

  # Your app's description.
  # Default is empty.
  description: Software to create fast and easy drum rolls.

  # Your app's license.
  # Default is empty.
  license: Apache 2.0

  # Formats to be generated.
  formats:
    - deb
    - rpm

  # Packages your package depends on.
  dependencies:
    - git
    - zsh

  # Packages your package recommends installing.
  # For RPM packages rpmbuild >= 4.13 is required
  recommends:
    - bzr
    - gtk

  # Packages your package suggests installing.
  # For RPM packages rpmbuild >= 4.13 is required
  suggests:
    - cvs
    - ksh

  # Packages that conflict with your package.
  conflicts:
    - svn
    - bash

  # Override default /usr/local/bin destination for binaries
  bindir: /usr/bin

  # Empty folders that should be created and managed by the packager
  # implementation.
  # Default is empty.
  empty_folders:
  - /var/log/foobar

  # Files or directories to add to your package (beyond the binary).
  # Keys are source paths/globs to get the files from.
  # Values are the destination locations of the files in the package.
  files:
    "scripts/etc/init.d/": "/etc/init.d"
    "path/**/glob": "/var/foo/glob"

  # Config files to add to your package. They are about the same as
  # the files keyword, except package managers treat them differently (while
  # uninstalling, mostly).
  # Keys are source paths/globs to get the files from.
  # Values are the destination locations of the files in the package.
  config_files:
    "tmp/app_generated.conf": "/etc/app.conf"
    "conf/*.conf": "/etc/foo/"

  # Scripts to execute during the installation of the package.
  # Keys are the possible targets during the installation process
  # Values are the paths to the scripts which will be executed
  scripts:
    preinstall: "scripts/preinstall.sh"
    postinstall: "scripts/postinstall.sh"
    preremove: "scripts/preremove.sh"
    postremove: "scripts/postremove.sh"

  # Some attributes can be overrided per package format.
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

> 了解有关的更多信息[名称模板引擎](/templates).

请注意,GoReleaser不会安装`rpmbuild`或任何依赖你.就目前而言,`rpmbuild`如果要生成rpm包,建议使用.你可以安装它`apt-get install rpm`要么`brew install rpm`.
