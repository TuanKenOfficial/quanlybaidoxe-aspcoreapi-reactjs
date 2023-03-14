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
        public int SoODo { get; set; } //số ô đỗ ở đây có nghĩa là mỗi ô đỗ sẽ đánh dấu số từ 1-100.
        [Required]
        public int SoTang { get; set; } // số tầng ở đây có nghĩa có nhiều tầng, ví dụ từ tầng 1- tầng 10
        [Required]
        public string? TrangThaiXe { get; set; }
    }
}
