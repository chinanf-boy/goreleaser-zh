---
title: 变量
weight: 20
menu: true
---

## GitHub令牌

GoReleaser需要一个**GitHub API token** ，其具有选择`repo`范围，具有部署到GitHub的权限。你可以创建一个[点-这里](https://github.com/settings/tokens/new).

此**token**应添加到环境变量中`GITHUB_TOKEN`.以下是Travis CI的使用方法:[在存储库设置中,定义环境变量](https://docs.travis-ci.com/user/environment-variables/#Defining-Variables-in-Repository-Settings).

或者,您可以在文件中提供GitHub令牌。默认情况下，GoReleaser会查看`~/.config/goreleaser/github_token`,您可以在`.goreleaser.yml`文件中更改它:

```yaml
# .goreleaser.yml
env_files:
  github_token: ~/.path/to/my/token
```

## GitHub企业版

要使用GitHub Enterprise，你需要提供其URL搭配`.goreleaser.yml`配置文件，给予GoReleaser使用:

```yaml
# .goreleaser.yml
github_urls:
  api: https://git.company.com/api/v3/
  upload: https://git.company.com/api/uploads/
  download: https://git.company.com/
```

如果没有设置,则默认为GitHub的公共URL.

**重要**:小心URL,它们可能会从一个安装更改为另一个安装。如果他们错了,goreleaser会在某些时候失败，所以，在开启Issue之前，确保他们是对的。例如,参见[#472][472].

[472]: https://github.com/goreleaser/goreleaser/issues/472

## dist文件夹

默认情况下,GoReleaser将在`./dist`中创建其二进制存档。如有必须,可以通过在`.goreleaser.yml`文件的设置，更改它:

```yaml
# .goreleaser.yml
dist: another-folder-that-is-not-dist
```

## 使用`main.version`

默认的GoReleaser设置三个*ldflags*:

-   `main.version`: 当前的Git标签(`v`前缀被剥离)或snapshot的名称，若正在使用`--snapshot`参数
-   `main.commit`: 当前git commit 的 SHA码
-   `main.date`: [RFC3339](https://golang.org/pkg/time/#pkg-constants)规范日期

这样，在你的`main.go`文件，就能被使用:

```go
package main

import "fmt"

var (
	version = "dev"
	commit  = "none"
	date    = "unknown"
)

func main() {
  fmt.Printf("%v, commit %v, built at %v", version, commit, date)
}
```

您可以通过更改`build`部分的`ldflags`选项，来覆盖它.
