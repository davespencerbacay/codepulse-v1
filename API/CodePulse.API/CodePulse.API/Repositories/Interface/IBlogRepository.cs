using CodePulse.API.Models.Domain;

namespace CodePulse.API.Repositories.Interface
{
    public interface IBlogRepository
    {
        Task<BlogPost> CreateAsync(BlogPost blog);
    }
}
