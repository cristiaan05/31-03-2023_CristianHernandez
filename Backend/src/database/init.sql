CREATE DATABASE gestiones;
GO
USE gestiones;
GO
CREATE TABLE Categorias
(
	IdCategoria INT IDENTITY PRIMARY KEY,
	Nombre VARCHAR(150) NOT NULL,
);
GO
CREATE TABLE Productos
(
	IdProducto INT IDENTITY PRIMARY KEY,
	NombreProducto VARCHAR(80) NOT NULL,
	IdCategoria INT NOT NULL,
	Descripcion VARCHAR(120),
	FOREIGN KEY (IdCategoria)REFERENCES Categorias(IdCategoria),
);
GO
CREATE TABLE Sucursales
(
	IdSucursal INT IDENTITY PRIMARY KEY,
	NombreSucursal VARCHAR(80) NOT NULL,
	Direccion VARCHAR(120) NOT NULL,
	Correo VARCHAR(80),
	Departamento VARCHAR(80)NOT NULL,
	Municipio VARCHAR(120) NOT NULL,
	Telefono VARCHAR(15)
);
GO
CREATE TABLE Inventarios (
  IdInventario INT IDENTITY PRIMARY KEY,
  id_producto INT NOT NULL,
  id_sucursal INT NOT NULL,
  cantidad INT NOT NULL,
  FOREIGN KEY (id_producto) REFERENCES Productos(IdProducto),
  FOREIGN KEY (id_sucursal) REFERENCES Sucursales(IdSucursal)
);
GO

-------------------------PROCEDIMIENTOS DE PRODUCTOS----------------------------------------------
CREATE PROCEDURE sp_AgregarProducto @NombreProducto VARCHAR(80),@IdCategoria INT,
			@Descripcion VARCHAR(120)
AS
	BEGIN 
		BEGIN TRY
			BEGIN TRAN
				INSERT INTO Productos(NombreProducto,IdCategoria,Descripcion)
					VALUES(@NombreProducto,@IdCategoria,@Descripcion);
			COMMIT TRAN;
		END TRY
		BEGIN CATCH
			PRINT Error_Message();
			ROLLBACK TRAN;
		END CATCH
	END;
GO
CREATE PROCEDURE sp_EliminarProducto @IdProducto INT
AS
	BEGIN 
		BEGIN TRY
			BEGIN TRAN
				DELETE Productos WHERE IdProducto=@IdProducto;
			COMMIT TRAN;
		END TRY
		BEGIN CATCH
			PRINT Error_Message();
			ROLLBACK TRAN;
		END CATCH
	END;
GO

CREATE PROCEDURE sp_ModificarProducto @IdProducto INT,@NombreProducto VARCHAR(80),@IdCategoria INT,
			@Descripcion VARCHAR(120)
AS
	BEGIN
		BEGIN TRY
			BEGIN TRAN
				UPDATE Productos SET NombreProducto=@NombreProducto,
					IdCategoria=@IdCategoria,Descripcion=@Descripcion
						WHERE IdProducto=@IdProducto;
			COMMIT TRAN;
		END TRY
		BEGIN CATCH
			PRINT Error_Message();
			ROLLBACK TRAN;
		END CATCH
	END;
GO


CREATE PROCEDURE sp_BuscarProducto @IdProducto INT
AS
	BEGIN
		BEGIN TRY
			BEGIN TRAN
				SELECT IdProducto,NombreProducto,Categorias.Nombre,Descripcion
				FROM Productos INNER JOIN Categorias ON Productos.IdCategoria=Categorias.IdCategoria
				WHERE IdProducto=@IdProducto;
			COMMIT TRAN;
		END TRY
		BEGIN CATCH
			PRINT Error_Message();
			ROLLBACK TRAN;
		END CATCH
	END;
GO

CREATE PROCEDURE sp_ListarProductos
AS
	BEGIN
		BEGIN TRY
			BEGIN TRAN
				SELECT IdProducto,NombreProducto,Categorias.IdCategoria,Categorias.Nombre,Descripcion
				FROM Productos INNER JOIN Categorias ON Productos.IdCategoria=Categorias.IdCategoria
			COMMIT TRAN;
		END TRY
		BEGIN CATCH
			PRINT Error_Message();
			ROLLBACK TRAN;
		END CATCH
	END;
GO
--------------------------------------PROCEDIMIENTOS DE CATEGORIAS-------------------------
CREATE PROCEDURE sp_AgregarCategoria @Nombre VARCHAR(150)
AS
	BEGIN 
		BEGIN TRY
			BEGIN TRAN
				INSERT INTO Categorias(Nombre)
					VALUES(@Nombre);
			COMMIT TRAN;
		END TRY
		BEGIN CATCH
			PRINT Error_Message();
			ROLLBACK TRAN;
		END CATCH
	END;
GO

CREATE PROCEDURE sp_EliminarCategoria @IdCategoria INT
AS
	BEGIN 
		BEGIN TRY
			BEGIN TRAN
				DELETE Categorias WHERE IdCategoria=@IdCategoria;
			COMMIT TRAN;
		END TRY
		BEGIN CATCH
			PRINT Error_Message();
			ROLLBACK TRAN;
		END CATCH
	END;
GO

CREATE PROCEDURE sp_ModificarCategoria @IdCategoria INT,@Nombre VARCHAR(150)
AS
	BEGIN
		BEGIN TRY
			BEGIN TRAN
				UPDATE Categorias SET Nombre=@Nombre
						WHERE IdCategoria=@IdCategoria;
			COMMIT TRAN;
		END TRY
		BEGIN CATCH
			PRINT Error_Message();
			ROLLBACK TRAN;
		END CATCH
	END;
GO

CREATE PROCEDURE sp_BuscarCategoria @IdCategoria INT
AS
	BEGIN
		BEGIN TRY
			BEGIN TRAN
				SELECT *
				FROM Categorias
				WHERE IdCategoria=@IdCategoria;
			COMMIT TRAN;
		END TRY
		BEGIN CATCH
			PRINT Error_Message();
			ROLLBACK TRAN;
		END CATCH
	END;
GO

CREATE PROCEDURE sp_ListarCategorias
AS
	BEGIN
		BEGIN TRY
			BEGIN TRAN
				SELECT *
				FROM Categorias
			COMMIT TRAN;
		END TRY
		BEGIN CATCH
			PRINT Error_Message();
			ROLLBACK TRAN;
		END CATCH
	END;
GO

--------------------------------------PROCEDIMIENTOS DE SUCURSALES-------------------------
CREATE PROCEDURE spAgregarSucursal @NombreSucursal VARCHAR(80), @Direccion VARCHAR(120),
	@Correo VARCHAR(80),@Departamento VARCHAR(80), @Municipio VARCHAR(120), @Telefono VARCHAR(15)
AS
	BEGIN 
		BEGIN TRY
			BEGIN TRAN
				INSERT INTO Sucursales(NombreSucursal,Direccion,Correo,Departamento,Municipio,Telefono)
					VALUES(@NombreSucursal,@Direccion,@Correo,@Departamento,@Municipio,@Telefono);
			COMMIT TRAN;
		END TRY
		BEGIN CATCH
			PRINT Error_Message();
			ROLLBACK TRAN;
		END CATCH
	END;
GO
CREATE PROCEDURE sp_EliminarSucursal @IdSucursal INT
AS
	BEGIN 
		BEGIN TRY
			BEGIN TRAN
				DELETE Sucursales WHERE IdSucursal=@IdSucursal;
			COMMIT TRAN;
		END TRY
		BEGIN CATCH
			PRINT Error_Message();
			ROLLBACK TRAN;
		END CATCH
	END;
GO

CREATE PROCEDURE sp_ModificarSucursal @IdSucursal INT,@NombreSucursal VARCHAR(80), @Direccion VARCHAR(120),
	@Correo VARCHAR(80),@Departamento VARCHAR(80), @Municipio VARCHAR(120), @Telefono VARCHAR(15)
AS
	BEGIN
		BEGIN TRY
			BEGIN TRAN
				UPDATE Sucursales SET NombreSucursal=@NombreSucursal,Direccion=@Direccion,
					Correo=@Correo,Departamento=@Departamento,Municipio=@Municipio,Telefono=@Telefono
						WHERE IdSucursal=@IdSucursal;
			COMMIT TRAN;
		END TRY
		BEGIN CATCH
			PRINT Error_Message();
			ROLLBACK TRAN;
		END CATCH
	END;
GO


CREATE PROCEDURE sp_BuscarSucursal @IdSucursal INT
AS
	BEGIN
		BEGIN TRY
			BEGIN TRAN
				SELECT *
				FROM Sucursales 
				WHERE IdSucursal=@IdSucursal;
			COMMIT TRAN;
		END TRY
		BEGIN CATCH
			PRINT Error_Message();
			ROLLBACK TRAN;
		END CATCH
	END;
GO

CREATE PROCEDURE sp_ListarSucursales
AS
	BEGIN
		BEGIN TRY
			BEGIN TRAN
				SELECT *
				FROM Sucursales
			COMMIT TRAN;
		END TRY
		BEGIN CATCH
			PRINT Error_Message();
			ROLLBACK TRAN;
		END CATCH
	END;
GO
--------------------------------------PROCEDIMIENTOS DE INVENTARIO-------------------------
CREATE PROCEDURE spAgregarInventario @IdProducto INT, @IdSucursal INT,@Cantidad INT
AS
	BEGIN 
		BEGIN TRY
			BEGIN TRAN
				INSERT INTO Inventarios(id_producto,id_sucursal,cantidad)
					VALUES(@IdProducto,@IdSucursal,@Cantidad);
			COMMIT TRAN;
		END TRY
		BEGIN CATCH
			PRINT Error_Message();
			ROLLBACK TRAN;
		END CATCH
	END;
GO
CREATE PROCEDURE sp_EliminarInventario @IdInventario INT
AS
	BEGIN 
		BEGIN TRY
			BEGIN TRAN
				DELETE Inventarios WHERE IdInventario=@IdInventario;
			COMMIT TRAN;
		END TRY
		BEGIN CATCH
			PRINT Error_Message();
			ROLLBACK TRAN;
		END CATCH
	END;
GO

CREATE PROCEDURE sp_ModificarInventario @IdInventario INT,@IdProducto INT, @IdSucursal INT,
			@Cantidad INT
AS
	BEGIN
		BEGIN TRY
			BEGIN TRAN
				UPDATE Inventarios SET id_producto=@IdProducto,id_sucursal=@IdSucursal,
					cantidad=@Cantidad
						WHERE IdInventario=@IdInventario;
			COMMIT TRAN;
		END TRY
		BEGIN CATCH
			PRINT Error_Message();
			ROLLBACK TRAN;
		END CATCH
	END;
GO


CREATE PROCEDURE sp_BuscarInventario @IdInventario INT
AS
	BEGIN
		BEGIN TRY
			BEGIN TRAN
				SELECT *
				FROM Inventarios 
				WHERE IdInventario=@IdInventario;
			COMMIT TRAN;
		END TRY
		BEGIN CATCH
			PRINT Error_Message();
			ROLLBACK TRAN;
		END CATCH
	END;
GO

CREATE PROCEDURE sp_ListarInventarios
AS
	BEGIN
		BEGIN TRY
			BEGIN TRAN
				SELECT IdInventario,Productos.IdProducto,Productos.NombreProducto,Sucursales.IdSucursal,Sucursales.NombreSucursal,cantidad
				FROM Inventarios
				INNER JOIN Sucursales ON Inventarios.id_sucursal = Sucursales.IdSucursal
				INNER JOIN Productos ON Inventarios.id_producto = Productos.IdProducto;
			COMMIT TRAN;
		END TRY
		BEGIN CATCH
			PRINT Error_Message();
			ROLLBACK TRAN;
		END CATCH
	END;
GO

select * from dbo.Categorias;
select * from Productos;
select * from Sucursales;
select * from Inventarios;

delete from Categorias where IdCategoria=1;




