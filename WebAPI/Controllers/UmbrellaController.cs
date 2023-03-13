using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data.SqlClient;
using System.Data;
using WebAPI.Models;

namespace WebAPI.Controllers
{
    //bảng Ô đỗ xe
    [Route("api/[controller]")]
    [ApiController]
    public class UmbrellaController : ControllerBase 
    {
        private readonly IConfiguration _configuration;
        private readonly IWebHostEnvironment _env;
        public UmbrellaController(IConfiguration configuration, IWebHostEnvironment env)
        {
            _configuration = configuration;
            _env = env;
        }
        
        //hiển thị bảng
        [HttpGet]
        public JsonResult Get()
        {
            string query = @"
                    select UmbrellaId, SoODo, SoTang, TenLoaiXe, BienSoXe, TrangThaiODo from dbo.Umbrella";
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

        //thêm bảng
        [HttpPost]
        public JsonResult Post(Umbrella umbrella)
        {
            string query = @"
                    insert into dbo.Umbrella values 
                    (
                     '" + umbrella.SoODo + @"'
                    ,'" + umbrella.SoTang + @"'
                    ,'" + umbrella.TenLoaiXe + @"'
                    ,'" + umbrella.BienSoXe + @"'
                    ,'" + umbrella.TrangThaiODo + @"'
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

        //update bảng
        [HttpPut]
        public JsonResult Put(Umbrella umbrella)
        {
            string query = @"
                    update dbo.Umbrella set
                    SoODo='" + umbrella.SoODo + @"'
                    ,SoTang='" + umbrella.SoTang + @"'
                    ,TenLoaiXe='" + umbrella.TenLoaiXe + @"'
                    ,BienSoXe='" + umbrella.BienSoXe + @"'
                    ,TrangThaiODo='" + umbrella.TrangThaiODo + @"'
                    where UmbrellaId = " + umbrella.UmbrellaId + @" 
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
        
        //xóa bảng
        [HttpDelete("{UmbrellaId}")]
        public JsonResult Delete(int UmbrellaId)
        {
            string query = @"
                    delete from dbo.Umbrella
                    where UmbrellaId = " + UmbrellaId + @" 
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
        [Route("GetAllSoODo")]
        [HttpGet]
        public JsonResult GetAllBienSoXe()
        {
            string query = @"
                    select SoODo, SoTang, TenLoaiXe, BienSoXe from dbo.Umbrella
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
