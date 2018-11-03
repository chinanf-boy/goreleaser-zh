---
title: Checksum-校验
series: customization
hideFromIndex: true
weight: 50
---
GoReleaser生成一个`project_1.0.0_checksums.txt`文件，并在发布时上传,以便您的用户可以验证下载的文件是否正确.

该`checksum`部分允许自定义文件名:

```yml
# .goreleaser.yml
checksum:
  # 选择 checksums 的名称.
  # 默认为 `{{ .ProjectName }}_{{ .Version }}_checksums.txt`.
  name_template: "{{ .ProjectName }}_checksums.txt"
```

> 了解有关[命名模板引擎](/templates)的更多信息.
