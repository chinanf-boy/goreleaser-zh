---
title: 介绍
weight: 1
menu: true
---

[GoReleaser](https://github.com/goreleaser/goreleaser)是Go项目的发布自动化工具,目标是简化构建,release和发布步骤,同时为所有步骤提供适当的自定义选项.

GoReleaser是为CI工具而构建的;你只需要在您的构建脚本中[下载并执行它](#ci_integration)。您可以通过[定制](#Customization)一个关于你的发布过程的`.goreleaser.yml`文件.

这个想法始于一个[简单的shell脚本](https://github.com/goreleaser/old-go-releaser)，但它很快变得更加复杂，我也希望通过`Homebrew taps`发布二进制文件，这会使脚本变得更加hacky，所以我放弃了它，并在Go中重写了整个内容.

## 安装Goreleaser

有三种方法可以安装GoReleaser:

### 使用homebrew

```sh
brew install goreleaser/tap/goreleaser
```

### 使用snapcraft

```sh
snap install goreleaser
```

### 使用Scoop

```sh
scoop bucket add goreleaser https://github.com/goreleaser/scoop-bucket.git
scoop install goreleaser
```

> 检查[tap源](https://github.com/goreleaser/homebrew-tap)，了解更多细节.

### 使用Docker

您可以使用Docker来执行简单的发布.目前,提供的docker镜像不支持snapcraft.

```console
$ docker run --rm --privileged \
  -v $PWD:/go/src/github.com/user/repo \
  -v /var/run/docker.sock:/var/run/docker.sock \
  -w /go/src/github.com/user/repo \
  -e GITHUB_TOKEN \
  -e DOCKER_USERNAME \
  -e DOCKER_PASSWORD \
  goreleaser/goreleaser release
```

请注意,镜像几乎总是最后一个稳定的Go版本.

如果您需要更多东西,我们鼓励您拥有自己的镜像。你可以使用GoReleaser自身的[Dockerfile][dockerfile]作为示例.

[dockerfile]: https://github.com/goreleaser/goreleaser/blob/master/Dockerfile

## 手动

从[发布页面](https://github.com/goreleaser/goreleaser/releases/latest)下载您喜欢的味道，并手动安装.

### 用go get

注意:此方法需要Go 1.10+.

```console
$ go get -d github.com/goreleaser/goreleaser
$ cd $GOPATH/src/github.com/goreleaser/goreleaser
$ dep ensure -vendor-only
$ make setup build
```

建议也运行下`dep ensure`，确保依赖项的版本正确.
