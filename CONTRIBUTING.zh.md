# 贡献

要参与此项目,请您同意遵守我们的要求[行为守则](/CODE_OF_CONDUCT.md).

[原文](https://github.com/goreleaser/goreleaser/blob/master/CONTRIBUTING.md)

## 设置您的机器

`goreleaser`是[Go](https://golang.org/)语言编写.

先决条件:

-   `make`
-   [Go1.11+](https://golang.org/doc/install)
-   `rpmbuild`(`apt get install rpm`/`brew install rpm`)
-   [snapcraft](https://snapcraft.io/)
-   [Docker](https://www.docker.com/)
-   `gpg`(可能已安装在您的系统上)

Clone `goreleaser` 到任何地方:

```sh
$ git clone git@github.com:goreleaser/goreleaser.git
```

安装构建和lint依赖项:

```console
$ make setup
```

确保一切正常的好方法，是运行测试套件:

```console
$ make test
```

## 测试你的变化

您可以为更改创建分支,并尝试从源代码构建:

```console
$ make build
```

如果您对更改感到满意,我们建议您运行:

```console
$ make ci
```

哪个运行所有的套件和测试.

## 创建一个提交

提交消息的格式要很好。使用类型为启动的提交消息。选择以下之一:`feat`,`fix`,`docs`,`style`,`refactor`,`perf`,`test`,`chore`,`revert`,`add`,`remove`,`move`,`bump`,`update`,`release`

冒号之后,您应该给消息一个标题，大写开头且结尾没有点。保持文本的宽度为72个字符。标题必须后跟换行符,然后是更详细的说明.

请在提交消息的最后一行，引用任何GitHub问题(例如`See #123`,`Closes #123`,`Fixes #123`).

一个例子:

```
docs: Add example for --release-notes flag

I added an example to the docs of the `--release-notes` flag to make
the usage more clear.  The example is an realistic use case and might
help others to generate their own changelog.

See #284
```

## 提交拉取请求

把你的分支推到你的`goreleaser`fork，并打开对主分支的pull请求.

## 捐助

我们也欢迎我们的捐助，完全透明的[opencollective](https://opencollective.com/goreleaser)。任何人都可以提出费用。如果费用对社区的发展有意义,它将由核心贡献者在我们的opencollective的分类账中"合并",并且报销费用的人将获得报销.

## 里碑

### 贡献者

感谢所有已经为goreleaser做出贡献的人们!<a href="graphs/contributors"><img src="https://opencollective.com/goreleaser/contributors.svg?width=890" /></a>

### 支持者

谢谢所有支持者!\[[成为支持者](https://opencollective.com/goreleaser#backer)]

<a href="https://opencollective.com/goreleaser#backers" target="_blank"><img src="https://opencollective.com/goreleaser/backers.svg?width=890"></a>

### 赞助商

感谢所有赞助商!(请让您的公司也支持这个开源项目，[成为赞助商](https://opencollective.com/goreleaser#sponsor))

<a href="https://opencollective.com/goreleaser/sponsor/0/website" target="_blank"><img src="https://opencollective.com/goreleaser/sponsor/0/avatar.svg"></a>
<a href="https://opencollective.com/goreleaser/sponsor/1/website" target="_blank"><img src="https://opencollective.com/goreleaser/sponsor/1/avatar.svg"></a>
<a href="https://opencollective.com/goreleaser/sponsor/2/website" target="_blank"><img src="https://opencollective.com/goreleaser/sponsor/2/avatar.svg"></a>
<a href="https://opencollective.com/goreleaser/sponsor/3/website" target="_blank"><img src="https://opencollective.com/goreleaser/sponsor/3/avatar.svg"></a>
<a href="https://opencollective.com/goreleaser/sponsor/4/website" target="_blank"><img src="https://opencollective.com/goreleaser/sponsor/4/avatar.svg"></a>
<a href="https://opencollective.com/goreleaser/sponsor/5/website" target="_blank"><img src="https://opencollective.com/goreleaser/sponsor/5/avatar.svg"></a>
<a href="https://opencollective.com/goreleaser/sponsor/6/website" target="_blank"><img src="https://opencollective.com/goreleaser/sponsor/6/avatar.svg"></a>
<a href="https://opencollective.com/goreleaser/sponsor/7/website" target="_blank"><img src="https://opencollective.com/goreleaser/sponsor/7/avatar.svg"></a>
<a href="https://opencollective.com/goreleaser/sponsor/8/website" target="_blank"><img src="https://opencollective.com/goreleaser/sponsor/8/avatar.svg"></a>
<a href="https://opencollective.com/goreleaser/sponsor/9/website" target="_blank"><img src="https://opencollective.com/goreleaser/sponsor/9/avatar.svg"></a>
