create table tblCurdNetCore(ID int identity(1,1) primary key ,Name varchar(100) ,Email varchar(100),IsActive int,CreatedOn Datetime)

select * from tblCurdNetCore

insert into tblCurdNetCore values('Sai','Sai@gamil.com',0,Getdate())