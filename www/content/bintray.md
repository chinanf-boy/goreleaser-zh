---
title: Bintray
series: customization
hideFromIndex: true
weight: 120
---
## 这个怎么运作

上传到Bintray是一个简单的例子[使用HTTP PUT](https://goreleaser.com/customization/#HTTP%20Put).

### 前后必备条件:

-   在Bintray中创建用户和/或组织
-   在Bintray中创建一个通用存储库
-   创建一个名称与您的名称匹配的包`ProjectName`
-   发布后,不要忘记发布上传的文件(通过UI或[REST API](https://bintray.com/docs/api/#_publish_discard_uploaded_content))

```yaml
puts:
  - name: bintray
    target: https://api.bintray.com/content/user.or.org.name/generic.repo.name/{{ .ProjectName }}/{{ .Version }}/
    username: goreleaser
```

请参阅[HTTP Put](https://goreleaser.com/customization/#HTTP%20Put)更多细节.
