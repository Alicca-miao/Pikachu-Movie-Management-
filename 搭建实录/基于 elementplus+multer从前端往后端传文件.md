问题1 ：file-list是前端存储上传后文件的目录（一开始就有文件）
这里不要担心。不要额外append数据

问题2。前端action里确实是上传文件请求的路径
应该写/api/upload
其中后端myexp里是这样写的

    const  upload = multer({ storage: storage });
    // 添加上传处理器
    router.post('/upload', upload.single('file'), (req, res) => {
    if (!req.file) {
    return  res.status(400).json({ msg: 'No file uploaded' });
    }
      
    console.log('path', req.file.path);
    console.log('originalname', req.file.originalname);
    const  filePath = `/images/${req.file.filename}`;
      
    res.json({
    msg: '文件上传成功',
    body: req.body,
    filePath: filePath  // 返回文件访问路径
    });
    });

*

问题3 路径不一致。在api.js里那个router.post和前面uploadpath路径要一致吗？
不要
upload那个代表的是从前端往后端请求的端口
uploadpath这里是指从	前端过来的文件存储在哪
这么写存储在router下的public/image
const  uploadPath = path.join(__dirname, 'public', 'images');
他好像直接创建了public和images两个文件
以及在app.js里要添加这个：
app.use('/images', express.static(path.join(__dirname, 'public')));

app.use('/public', express.static(path.join(__dirname, 'public')));
