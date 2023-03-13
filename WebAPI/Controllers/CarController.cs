using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System.Data.SqlClient;
using System.Data;
using WebAPI.Models;

namespace WebAPI.Controllers
{
    //bảng quản lý xe
    [Route("api/[controller]")]
    [ApiController]
    public class CarController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly IWebHostEnvironment _env;

        public CarController(IConfiguration configuration, IWebHostEnvironment env)
        {
            _configuration = configuration;
            _env = env;
        }
        [HttpGet]
        public JsonResult Get()
        {
            string query = @"
                    select CarId, TenLoaiXe, BienSoXe,TrangThaiXe from dbo.Car";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("QuanlybaidoxeAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader); ;

                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult(table);
        }

        [HttpPost]
        public JsonResult Post(Car car)
        {
            string query = @"
                    insert into dbo.Car values 
                    ('" + car.TenLoaiXe + @"'
                    ,'" + car.BienSoXe + @"'
                    ,'" + car.TrangThaiXe + @"'
                    )
                    ";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("QuanlybaidoxeAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);

                    myReader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult("Thêm thành công");
        }

        [HttpPut]
        public JsonResult Put(Car car)
        {
            string query = @"
                    update dbo.Car set
                    TenLoaiXe= '" + car.TenLoaiXe + @"'
                    ,BienSoXe= '" + car.BienSoXe + @"'
                    ,TrangThaiXe ='" + car.TrangThaiXe + @"'
                    where CarId = " + car.CarId + @" 
                    ";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("QuanlybaidoxeAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader); ;

                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult("Update thành công");
        }

        [HttpDelete("{CarId}")]
        public JsonResult Delete(int CarId)
        {
            string query = @"
                    delete from dbo.Car
                    where CarId = " + CarId + @" 
                    ";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("QuanlybaidoxeAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader); ;

                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult("Xóa thành công");
        }

        [Route("GetAllBienSoXe")]
        [HttpGet]
        public JsonResult GetAllBienSoXe()
        {
            string query = @"
                    select TenLoaiXe, BienSoXe from dbo.Car
                    ";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("QuanlybaidoxeAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader); ;

                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult(table);
        }

    }
}
