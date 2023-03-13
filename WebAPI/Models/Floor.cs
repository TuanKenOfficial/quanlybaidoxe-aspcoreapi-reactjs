using System.ComponentModel.DataAnnotations;

namespace WebAPI.Models
{
    public class Floor
    {
        public int FloorId { get; set; }
        [Required]
        public int SoTang { get; set; }
        [Required]
        public int TrangThai { get; set; }    
    }
}
