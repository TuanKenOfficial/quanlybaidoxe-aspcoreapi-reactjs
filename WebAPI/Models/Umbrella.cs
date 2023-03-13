using System.ComponentModel.DataAnnotations;

namespace WebAPI.Models
{
    public class Umbrella
    {
        public int UmbrellaId { get; set; }
        [Required]
        public int SoODo { get; set; }
        [Required]
        public int SoTang { get; set; }
        [Required]
        public string? TenLoaiXe { get; set; }
        [Required]
        public string? BienSoXe { get; set; }
        [Required]
        public int TrangThaiODo { get; set; }
    }
}
