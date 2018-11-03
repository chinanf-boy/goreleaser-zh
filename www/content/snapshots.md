---
title: Snapshots-快照
series: customization
hideFromIndex: true
weight: 70
---

有时我们希望生成项目的完整版本,但既不想验证任何内容,也不想将其上传到任何地方。GoReleaser支持这个`--snapshot`参数和`snapshot`的定制部分:

```yml
# .goreleaser.yml
snapshot:
  # 允许你更改生成的快照名称
  # 默认为 `SNAPSHOT-{{.Commit}}`.
  name_template: SNAPSHOT-{{.Commit}}
```

> 了解有关[命名模板引擎](/templates)的更多信息.
