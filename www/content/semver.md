---
title: Semantic Versioning
weight: 11
menu: true
---
GoReleaser强制执行语义版本控制,并在非兼容标签上出错.

你的标签**应该**是有效的[语义版本](http://semver.org/).如果不是,GoReleaser将会出错.

该`v`前缀不是强制性的.你可以检查一下[模板](/templates)文档,以了解如何在名称模板中使用标记或语义版本的每个部分.
