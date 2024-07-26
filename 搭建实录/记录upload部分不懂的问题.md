
将上传的文件上传到uploads里为何后续在images里访问？上传文件一定要用multer中间件吗 原本服务器里就有 被托管的静态资源在images目录下并且能被前端用get方式请求到，upload.single('file'为何加了这句话

1. `multer` 是一个处理 `multipart/form-data` 类型的中间件，主要用于处理文件上传。它能很好地处理文件上传的各种细节，包括临时文件存储、文件名生成、文件大小限制等。

2. ### 上传到 `uploads` 目录后再移动到 `images` 目录的原因

在你的代码中，文件首先上传到 `uploads` 目录，然后再移动到 `images` 目录。这么做的原因通常是为了在正式保存文件之前对其进行一些处理（如验证文件类型、大小等）

3 ### 关于 `upload.single('file')`

在 `multer` 中间件中，`upload.single('file')` 表示处理单个文件上传，并将文件的内容保存在 `req.file` 中。


