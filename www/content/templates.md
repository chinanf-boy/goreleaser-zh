---
title: Name Templates
series: customization
hideFromIndex: true
weight: 25
---
GoReleaser的配置文件中的几个字段支持模板.

这些字段通常以后缀为后缀`_template`,但有时他们可能不会.每个部分的文档应明确指出模板可用的字段.

在支持模板的字段上,此字段始终可用:

| 键 | 描述 |
| :-: | :-: |
| `.ProjectName` | 项目名称 |
| `.Version` | 正在发布的版本(`v`前缀剥离) |
| `.Tag` | 当前的git标签 |
| `.ShortCommit` | git提交短哈希 |
| `.FullCommit` | git提交完整哈希 |
| `.Commit` | git commit hash(不建议使用) |
| `.GitURL` | git远程网址 |
| `.Major` | 该版本的主要部分 |
| `.Minor` | 版本的次要部分 |
| `.Patch` | 版本的补丁部分 |
| `.Env` | 带有系统环境变量的地图 |
| `.Date` | RFC3339格式的当前UTC日期 |
| `.Timestamp` | Unix格式的当前UTC时间 |

在与单个工件(例如,二进制名称)相关的字段上,您可能有一些额外的字段:

| 键 | 描述 |
| :-: | :-: |
| `.Os` | `GOOS`(通常允许更换) |
| `.Arch` | `GOARCH`(通常允许更换) |
| `.Arm` | `GOARM`(通常允许更换) |
| `.Binary` | 二进制名称 |
| `.ArtifactName` | 存档名称 |

在所有字段中,您都有以下可用功能:

| 用法 | 描述 |
| :-: | :-: |
| `time "01/02/2006"` | 指定格式的当前UTC时间 |

使用所有这些字段,您可以按照自己想要的方式组合工件的名称:

```yaml
example_template: '{{ .ProjectName }}_{{ .Env.USER }}_{{ time "2006" }}'
```

例如,如果要将go版本添加到某个工件:

```yaml
foo_template: 'foo_{{ .Env.GOVERSION }}'
```

然后你可以运行:

```console
GOVERSION_NR=$(go version | awk '{print $3;}') goreleaser
```

> 请注意,这些是假设的示例和字段`foo_template`和`example_template`不是有效的GoReleaser配置.
