---
title: 存档文件
series: customization
hideFromIndex: true
weight: 40
---

构建的二进制文件将与`README`和`LICENSE`文件一起存档到`tar.gz`文件。在`archive`里面您可以自定义存档名称,其他文件和格式.

这是一个`archive`，指定了所有字段部分的注释:

```yml
# .goreleaser.yml
archive:
  # 存档 命名 模版.
  # 默认:
  # - if 格式为 `tar.gz` 或者 `zip`:
  #   - `{{ .ProjectName }}_{{ .Version }}_{{ .Os }}_{{ .Arch }}{{ if .Arm }}v{{ .Arm }}{{ end }}`
  # - if 格式为 是 `binary`:
  #   - `{{ .Binary }}_{{ .Version }}_{{ .Os }}_{{ .Arch }}{{ if .Arm }}v{{ .Arm }}{{ end }}`
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

  # 设为 true, 如果你想 所有 文件都包裹进存档文件.
  # 若设为 true 和 你 解压'goreleaser_Linux_arm64.tar.gz',
  # 你会得到 'goreleaser_Linux_arm64' 文件夹.
  # If 设为 false, 所有文件都分离开来.
  # 默认是 false.
  wrap_in_directory: true

  # Archive 格式. 合法选项 `tar.gz`, `zip` and `binary`.
  # 若 `binary`, 压缩文件不创建，且 binaries 代之直接上传.
  # 与 name_template 合作 和 下面 files字段中会被忽略.
  # 默认是 `tar.gz`.
  format: zip

  # 可根据 GOOSs，指定 格式.
  # 常见情况是，window下为zip格式.
  # 默认是 空.
  format_overrides:
    - goos: windows
      format: zip

  # 你想加入到 archive，匹配的 files/globs，.
  # 默认为匹配 `LICENCE*`, `LICENSE*` ,
  # `README*` 和 `CHANGELOG*` (大小写略) 的文件.
  files:
    - LICENSE.txt
    - README.md
    - CHANGELOG.md
    - docs/*
    - design/*.png
    - templates/**/*
```

> 了解有关[命名模板引擎](/templates)的更多信息.

您可以使用 glob表示法 添加整个文件夹,其子文件夹和文件,例如:`myfolder/**/*`.

## 仅包装二进制文件

由于，如果文件列表为空，GoReleaser将始终添加`README`和`LICENSE`文件到存档。所以您需要提供把 archive 下的`files`填充.

极客工作，是使用这样的东西:

```yaml
# goreleaser.yml
archive:
  files:
  - none*
```

这将**添加** `none*` **glob匹配**的所有文件，假设您**没有**与该glob匹配的任何文件,**只**会将二进制文件添加到存档中.

有关更多信息,请查看[#602](https://github.com/goreleaser/goreleaser/issues/602)
