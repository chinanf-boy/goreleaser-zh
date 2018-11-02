---
title: Archive
series: customization
hideFromIndex: true
weight: 40
---
构建的二进制文件将与之一起存档`README`和`LICENSE`文件到`tar.gz`文件.在里面`archive`您可以自定义存档名称,其他文件和格式.

这是一个评论`archive`指定了所有字段的部分:

```yml
# .goreleaser.yml
archive:
  # Archive name template.
  # Defaults:
  # - if format is `tar.gz` or `zip`:
  #   - `{{ .ProjectName }}_{{ .Version }}_{{ .Os }}_{{ .Arch }}{{ if .Arm }}v{{ .Arm }}{{ end }}`
  # - if format is `binary`:
  #   - `{{ .Binary }}_{{ .Version }}_{{ .Os }}_{{ .Arch }}{{ if .Arm }}v{{ .Arm }}{{ end }}`
  name_template: "{{ .ProjectName }}_{{ .Version }}_{{ .Os }}_{{ .Arch }}"

  # Replacements for GOOS and GOARCH in the archive name.
  # Keys should be valid GOOSs or GOARCHs.
  # Values are the respective replacements.
  # Default is empty.
  replacements:
    amd64: 64-bit
    386: 32-bit
    darwin: macOS
    linux: Tux

  # Set to true, if you want all files in the archive to be in a single directory.
  # If set to true and you extract the archive 'goreleaser_Linux_arm64.tar.gz',
  # you get a folder 'goreleaser_Linux_arm64'.
  # If set to false, all files are extracted separately.
  # Default is false.
  wrap_in_directory: true

  # Archive format. Valid options are `tar.gz`, `zip` and `binary`.
  # If format is `binary`, no archives are created and the binaries are instead uploaded directly.
  # In that case name_template and the below specified files are ignored.
  # Default is `tar.gz`.
  format: zip

  # Can be used to change the archive formats for specific GOOSs.
  # Most common use case is to archive as zip on Windows.
  # Default is empty.
  format_overrides:
    - goos: windows
      format: zip

  # Additional files/globs you want to add to the archive.
  # Defaults are any files matching `LICENCE*`, `LICENSE*`,
  # `README*` and `CHANGELOG*` (case-insensitive).
  files:
    - LICENSE.txt
    - README.md
    - CHANGELOG.md
    - docs/*
    - design/*.png
    - templates/**/*
```

> 了解有关的更多信息[名称模板引擎](/templates).

您可以使用glob表示法添加整个文件夹,其子文件夹和文件,例如:`myfolder/**/*`.

## 仅包装二进制文件

由于GoReleaser将始终添加`README`和`LICENSE`如果文件列表为空,则文件到存档,您需要提供填充`files`在存档部分.

工作黑客是使用这样的东西:

```yaml
# goreleaser.yml
archive:
  files:
  - none*
```

这将添加与glob匹配的所有文件`none*`,假设您没有与该glob匹配的任何文件,只会将二进制文件添加到存档中.

有关更多信息,请检查[#602](https://github.com/goreleaser/goreleaser/issues/602)
