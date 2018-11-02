---
title: Quick Start
weight: 10
menu: true
---
在这个例子中,我们将构建,存档和发布Go项目.

创建一个GitHub存储库并添加一个主包:

```go
// main.go
package main

func main() {
  println("Ba dum, tss!")
}
```

跑`goreleaser init`创建一个例子`.goreleaser.yaml`文件:

```console
$ goreleaser init

   • Generating .goreleaser.yml file
   • config created; please edit accordingly to your needs file=.goreleaser.yml
```

生成的配置文件如下所示:

```yml
# This is an example goreleaser.yaml file with some sane defaults.
# Make sure to check the documentation at http://goreleaser.com
builds:
- env:
  - CGO_ENABLED=0
archive:
  replacements:
    darwin: Darwin
    linux: Linux
    windows: Windows
    386: i386
    amd64: x86_64
checksum:
  name_template: 'checksums.txt'
snapshot:
  name_template: "{{ .Tag }}-next"
changelog:
  sort: asc
  filters:
    exclude:
    - '^docs:'
    - '^test:'
```

GoReleaser将为您的应用程序构建Windows,Linux和macOS的二进制文件,包括amd64和i386体系结构.您可以通过更改来自定义`builds`部分.检查[文件](/build)欲获得更多信息.

构建二进制文件后,GoReleaser将为每个OS / Arch对创建一个存档到一个单独的文件中.您可以通过更改来自定义多项内容`archive`部分.检查[文件](/archive)欲获得更多信息.

你需要导出一个`GITHUB_TOKEN`环境变量,它应该包含一个有效的GitHub标记`repo`范围.它将用于将版本部署到您的GitHub存储库.您可以创建令牌[这里](https://github.com/settings/tokens/new).

```console
$ export GITHUB_TOKEN=`YOUR_TOKEN`
```

GoReleaser将使用最新的[Git标签](https://git-scm.com/book/en/v2/Git-Basics-Tagging)您的存储库.创建一个标签并将其推送到GitHub:

```console
$ git tag -a v0.1.0 -m "First release"
$ git push origin v0.1.0
```

> **注意**:检查您的标签是否符合[语义版本控制](/semver).

如果您还不想创建标记,还可以使用.创建基于最新提交的版本`--snapshot`旗.

现在您可以在存储库的根目录下运行GoReleaser:

```console
$ goreleaser
```

就这样!检查您的GitHub项目的发布页面.该版本应如下所示:

<a href="https://github.com/goreleaser/goreleaser/releases">
  <img width="100%"
    src="https://cloud.githubusercontent.com/assets/245435/23342061/fbcbd506-fc31-11e6-9d2b-4c1b776dee9c.png">
</a>

## 干运行

如果你想在发布"真实"版本之前测试所有内容,你可以使用`--skip-publish`flag,只会构建和打包东西:

```console
$ goreleaser release --skip-publish
```

您可以通过运行检查其他选项:

```console
$ goreleaser --help
```

和

```console
$ goreleaser release --help
```
