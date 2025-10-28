package list.reviews.write.repository;

import list.reviews.write.entity.Write;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WriteRepository extends JpaRepository<Write, Long> {
}
