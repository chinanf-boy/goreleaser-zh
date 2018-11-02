---
title: 弃用通知
menu: true
weight: 500
hideFromIndex: true
---

此页面将用于列出GoReleaser的弃用通知.

弃用代码将在弃用之后，约6个月后删除.

# 主动弃用通知

## docker.image

> 自2018-10-20

不推荐使用此属性,以支持更灵活`image_templates`.我们的想法是能够使用模板定义多个镜像和标签,而不仅仅是一个带有标签模板的镜像.这种灵活性允许将镜像推送到多个注册表.

改变这个:

```yaml
dockers:
- image: foo/bar
  tag_templates:
    - '{{ .Tag }}'
```

到这个:

```yaml
dockers:
- image_templates:
    - 'foo/bar:{{ .Tag }}'
```

## docker.tag_templates

> 自2018-10-20

不推荐使用此属性,以支持更灵活`image_templates`.我们的想法是能够使用模板定义多个镜像和标签,而不仅仅是一个带有标签模板的镜像.

改变这个:

```yaml
dockers:
- image: foo/bar
  tag_templates:
    - '{{ .Tag }}'
```

到这个:

```yaml
dockers:
- image_templates:
    - 'foo/bar:{{ .Tag }}'
```

<!--

Template for new deprecations:

## property

> since yyyy-mm-dd

Description.

Change this:

```yaml
```

to this:

```yaml
```

 -->

## git.short_hash

> 自2018-10-03

此属性用于告诉GoReleaser使用短git哈希，而不是完整哈希。将其删除,有利于指定的模板变量(`.FullCommit`和`.ShortCommit`).

改变这个:

```yaml
git:
  short_hash: true

fake:
  foo_template: 'blah {{ .Commit }}'
```

到这个:

```yaml
fake:
  foo_template: 'blah {{ .ShortCommit }}'
```

# 过期的弃用通知

以下选项已弃用约6个月,现在不受支持.

## fpm

> 自2018-02-17
>
> 删除2017-08-15

FPM不赞成，使用nfpm,这是一个用Go编写的更简单的替代方法.目标是消除ruby依赖性,从而简化CI/CD管道.

只需更换`fpm`关键字`nfpm`在你的`goreleaser.yaml`文件.

改变这个:

```yaml
fpm:
  # ...
```

到这个:

```yaml
nfpm:
  # ...
```

## docker.tag_template

> 自2018年1月19日
>
> 删除2017-08-15

此属性已被弃用,有利于复数`tag_templates`。我们的想法是能够定义几个标签而不是一个标签.

改变这个:

```yaml
dockers:
- image: foo/bar
  tag_template: '{{ .Tag }}'
```

到这个:

```yaml
dockers:
- image: foo/bar
  tag_templates:
    - '{{ .Tag }}'
```

## docker.latest

> 自2018年1月19日
>
> 删除2017-08-15

该`latest`Docker配置中的字段已弃用,换成新的`tag_templates`字段.

改变这个:

```yaml
dockers:
- image: foo/bar
  latest: true
```

到这个:

```yaml
dockers:
- image: foo/bar
  tag_templates:
    - '{{ .Tag }}'
    - latest
```
