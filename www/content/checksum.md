---
title: Checksum
series: customization
hideFromIndex: true
weight: 50
---
GoReleaser生成一个`project_1.0.0_checksums.txt`文件并在发布时上传,以便您的用户可以验证下载的文件是否正确.

该`checksum`section允许自定义文件名:

```yml
# .goreleaser.yml
checksum:
  # You can change the name of the checksums file.
  # Default is `{{ .ProjectName }}_{{ .Version }}_checksums.txt`.
  name_template: "{{ .ProjectName }}_checksums.txt"
```

> 了解有关的更多信息[名称模板引擎](/templates).
