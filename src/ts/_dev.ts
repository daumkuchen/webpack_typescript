if (process.env.NODE_ENV === 'development') {
    setTimeout(console.log.bind(console,'%cTHIS SOURCE IS DEVELOPMENT MODE.','color: #fff;background-color: #9dbc04;border:6px solid #9dbc04;'));
} else {
    setTimeout(console.log.bind(console,'%cCreated By https://baqemono.jp','color: #fff;background-color: rgb(76, 76, 76);border:6px solid rgb(76, 76, 76);'));
}