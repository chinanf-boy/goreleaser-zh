---
title: Introduction
weight: 1
menu: true
---
[GoReleaser](https://github.com/goreleaser/goreleaser)是Go项目的发布自动化工具,目标是简化构建,发布和发布步骤,同时为所有步骤提供变体自定义选项.

GoReleaser是为CI工具而构建的;你只需要[下载并执行它](#ci_integration)在您的构建脚本中.您可以[定制](#Customization)通过创建一个你的发布过程`.goreleaser.yml`文件.

这个想法始于一个[简单的shell脚本](https://github.com/goreleaser/old-go-releaser)但它很快变得更加复杂,我也希望通过Homebrew taps发布二进制文件,这会使脚本变得更加hacky,所以我放弃了它并在Go中重写了整个内容.

## 安装Goreleaser

有三种方法可以安装GoReleaser:

### 使用自制软件

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

> 检查[点击源](https://github.com/goreleaser/homebrew-tap)更多细节.

### 使用Docker

您可以使用Docker来执行简单的发布.目前,提供的泊坞窗图像不支持快照.

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

请注意,图像几乎总是具有最后一个稳定的Go版本.

如果您需要更多东西,我们鼓励您拥有自己的形象.你总是可以使用GoReleaser[拥有Dockerfile][dockerfile]举个例子.

[dockerfile]: https://github.com/goreleaser/goreleaser/blob/master/Dockerfile

## 手动

从中下载您喜欢的味道[发布页面](https://github.com/goreleaser/goreleaser/releases/latest)并手动安装.

### 用go go

注意:此方法需要Go 1.10+.

```console
$ go get -d github.com/goreleaser/goreleaser
$ cd $GOPATH/src/github.com/goreleaser/goreleaser
$ dep ensure -vendor-only
$ make setup build
```

建议也运行`dep ensure`确保依赖项的版本正确.
