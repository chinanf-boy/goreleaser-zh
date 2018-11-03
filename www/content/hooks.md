---
title: 全局 钩子
series: customization
hideFromIndex: true
weight: 20
---

某些构建可能需要在构建之前，进行预构建步骤，例如,`go generate`。其`before`部分允许在构建开始之前，执行的全局钩子.

配置很简单,这是一个完整的例子:

```yml
# .goreleaser.yml
before:
  hooks:
  - make clean
  - go generate ./...
  - go mod download
```

如果任何钩子失败，则中止构建过程.

重点注意的是,你不能拥有"复杂"的命令,比如`bash -c "echo foo bar"`或者`foo | bar`或类似的东西。如果你需要做的事情，比只调用带有某些参数的命令更复杂,可以将它包装在shell脚本中，或者包含在你的`Makefile`脚本中.
