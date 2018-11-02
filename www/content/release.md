---
title: Release
series: customization
hideFromIndex: true
weight: 110
---
GoReleaser将使用当前标记创建GitHub版本,上传所有工件并根据自上一个标记以来的新提交生成更改日志.

让我们来看看可以定制的内容`release`部分:

```yml
# .goreleaser.yml
release:
  # Repo in which the release will be created.
  # Default is extracted from the origin remote URL.
  github:
    owner: user
    name: repo

  # If set to true, will not auto-publish the release.
  # Default is false.
  draft: true

  # If set to true, will mark the release as not ready for production.
  # Default is false.
  prerelease: true

  # You can change the name of the GitHub release.
  # Default is ``
  name_template: "{{.ProjectName}}-v{{.Version}} {{.Env.USER}}"

  # You can disable this pipe in order to not upload any artifacts to
  # GitHub.
  # Defaults to false.
  disable: true
```

> 了解有关的更多信息[名称模板引擎](/templates).

## 自定义更改日志

您可以使用自定义生成更改日志的方式`changelog`配置文件中的部分:

```yaml
# .goreleaser.yml
changelog:
  # could either be asc, desc or empty
  # Default is empty
  sort: asc
  filters:
    # commit messages matching the regexp listed here will be removed from
    # the changelog
    # Default is empty
    exclude:
      - '^docs:'
      - typo
      - (?i)foo
```

## 自定义发行说明

您可以指定包含自定义发行说明的文件,并将其传递给`--release-notes=FILE`旗.然后,GoReleaser将使用您文件的内容跳过自己的发行说明生成.您可以使用Markdown格式化文件的内容.

在Unix系统上,您还可以使用在线生成发行说明[过程替代](https://en.wikipedia.org/wiki/Process_substitution).列出自上一个标记以来的所有提交,但跳过以.开头的提交`Merge`要么`docs`,你可以运行这个命令:

```console
$ goreleaser --release-notes <(some_changelog_generator)
```

您可以使用的一些更改日志生成器:

-   [buchanae / github上释放小笔记](https://github.com/buchanae/github-release-notes)
