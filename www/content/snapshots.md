---
title: Snapshots
series: customization
hideFromIndex: true
weight: 70
---
有时我们希望生成项目的完整版本,但既不想验证任何内容,也不想将其上传到任何地方.GoReleaser支持这个`--snapshot`国旗和也`snapshot`定制部分:

```yml
# .goreleaser.yml
snapshot:
  # Allows you to change the name of the generated snapshot
  # Default is `SNAPSHOT-{{.Commit}}`.
  name_template: SNAPSHOT-{{.Commit}}
```

> 了解有关的更多信息[名称模板引擎](/templates).
