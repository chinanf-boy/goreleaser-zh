---
title: Environment
weight: 20
menu: true
---
## GitHub令牌

GoReleaser需要一个GitHub API令牌`repo`选择范围以将工件部署到GitHub.你可以创建一个[这里](https://github.com/settings/tokens/new).

此标记应添加到环境变量中`GITHUB_TOKEN`.以下是Travis CI的使用方法:[在存储库设置中定义变量](https://docs.travis-ci.com/user/environment-variables/#Defining-Variables-in-Repository-Settings).

或者,您可以在文件中提供GitHub令牌.GoReleaser会检查`~/.config/goreleaser/github_token`默认情况下,您可以在中更改它`.goreleaser.yml`文件:

```yaml
# .goreleaser.yml
env_files:
  github_token: ~/.path/to/my/token
```

## GitHub企业版

您可以通过在GitHub Enterprise中提供其URL来使用GoReleaser`.goreleaser.yml`配置文件:

```yaml
# .goreleaser.yml
github_urls:
  api: https://git.company.com/api/v3/
  upload: https://git.company.com/api/uploads/
  download: https://git.company.com/
```

如果没有设置,则默认为GitHub的公共URL.

**重要**:小心URL,它们可能会从一个安装更改为另一个安装.如果他们错了,goreleaser会在某些时候失败,所以,在开启问题之前确保他们是对的.例如,参见[#472][472].

[472]: https://github.com/goreleaser/goreleaser/issues/472

## dist文件夹

默认情况下,GoReleaser将在其中创建其工件`./dist`夹.如果必须,可以通过在中设置来更改它`.goreleaser.yml`文件:

```yaml
# .goreleaser.yml
dist: another-folder-that-is-not-dist
```

## 使用`main.version`

默认的GoReleaser设置三个*ldflags*:

-   `main.version`:当前的Git标签(`v`如果您正在使用,则前缀被剥离)或快照的名称`--snapshot`旗
-   `main.commit`:当前git提交SHA
-   `main.date`:日期[RFC3339](https://golang.org/pkg/time/#pkg-constants)

你可以在你的`main.go`文件:

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

您可以通过更改来覆盖它`ldflags`选项`build`部分.
