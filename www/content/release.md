---
title: Release-版告
series: customization
hideFromIndex: true
weight: 110
---

GoReleaser 根据当前标记,创建 GitHub 版本,上传所有存档，并根据自上一个标记以来的新提交生成更改日志-changelog.

让我们来看看可以定制的`release`部分内容:

```yml
# .goreleaser.yml
release:
  # 要release的存储库。
  # 默认值从原始远程URL中提取。
  github:
    owner: user
    name: repo

  # 如果设置为true，则不会自动发布该版本。
  # 默认值为false。
  draft: true

  # 如果设置为true，则将发布tag为 预发布版本。
  # 默认值为false。
  prerelease: true

  # 您可以更改GitHub版本的名称。
  # 默认是``
  name_template: '{{.ProjectName}}-v{{.Version}} {{.Env.USER}}'

  # 您可以禁用此管道，将不上传到GitHub
  # 默认为false。
  disable: true
```

> 了解有关[命名模板引擎](/templates)的更多信息.

## 自定义更改日志

您可以使用自定义配置文件中`changelog`的部分，来修改生成changelog的方式:

```yaml
# .goreleaser.yml
changelog:
  # 可以是asc，desc或empty
  # 默认为空
  sort: asc
  filters:
    # 删除与下方列表匹配的commit信息，将不在changelog显示
    # 默认为空
    exclude:
      - '^docs:'
      - typo
      - (?i)foo
```

## 自定义发行说明

您可以自定义一个包含发行说明的**文件**,并将其传递给`--release-notes=FILE`参数。然后,GoReleaser 将使用您文件的内容，而跳过自己的发行说明生成。您可以使用 Markdown 格式化文件的内容.

在 Unix 系统上,您还可以使用[process substitution](https://en.wikipedia.org/wiki/Process_substitution)命令，生成发行说明。即列出自上一个标记以来的所有提交,但跳过以`Merge`要么`docs`开头的提交,你可以运行这个命令:

```console
$ goreleaser --release-notes <(some_changelog_generator)
```

您可以使用的,一些更改日志生成器-`some_changelog_generator`:

- [buchanae/github-release-notes](https://github.com/buchanae/github-release-notes)
