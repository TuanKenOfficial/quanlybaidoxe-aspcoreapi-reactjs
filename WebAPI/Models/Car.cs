using System.ComponentModel.DataAnnotations;

namespace WebAPI.Models
{
    public class Car
    {
        public int CarId { get; set; }
        [Required]
        public string? TenLoaiXe { get; set; }
        [Required]
        public string? BienSoXe { get; set; }
        [Required]
        public int TrangThaiXe { get; set; }
    }
}
