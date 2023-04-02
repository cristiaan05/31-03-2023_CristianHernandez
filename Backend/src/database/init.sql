CREATE DATABASE gestiones;
GO
USE gestiones;
GO
CREATE TABLE Categorias
(
	IdCategoria INT IDENTITY PRIMARY KEY,
	Nombre VARCHAR(150),
);
GO
CREATE TABLE Productos
(
	IdProducto INT IDENTITY PRIMARY KEY,
	NombreProducto VARCHAR(80),
	IdCategoria INT,
	Descripcion VARCHAR(120),
	FOREIGN KEY (IdCategoria)REFERENCES Categorias(IdCategoria),
);
GO
CREATE TABLE Sucursales
(
	IdSucursal INT IDENTITY PRIMARY KEY,
	Nombre VARCHAR(80),
	Direccion VARCHAR(120),
	Correo VARCHAR(80),
	Departamento VARCHAR(80),
	Municipio VARCHAR(120),
	Telefono VARCHAR(15)
);
GO
CREATE TABLE Inventario (
  id_producto INT,
  id_sucursal INT,
  cantidad INT,
  PRIMARY KEY (id_producto, id_sucursal),
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
				SELECT IdProducto,NombreProducto,Categorias.Nombre,Descripcion
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

select * from dbo.Categorias;
select * from Productos;

delete from Categorias where IdCategoria=1;