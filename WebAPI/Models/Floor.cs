using System.ComponentModel.DataAnnotations;

namespace WebAPI.Models
{
    public class Floor
    {
        public int FloorId { get; set; }
        [Required]
        public int SoTang { get; set; } // số tầng ở đây có nghĩa có nhiều tầng, ví dụ từ tầng 1- tầng 10
        [Required]
        public string? TrangThai { get; set; }    
    }
}
