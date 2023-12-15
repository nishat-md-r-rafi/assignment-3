import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { courseService } from './course.service';

const createCourse = catchAsync(async (req, res) => {
  const result = await courseService.createCourseIntoDB(req.body);

  sendResponse(res, {
    success: true,
    statusCode: 201,
    data: result,
  });
});

const getCourses = catchAsync(async (req, res) => {
  const result = await courseService.getCoursesFromDB(req.query);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Courses retrieved successfully',
    data: result,
  });
});

const getCourseReviews = catchAsync(async (req, res) => {
  // console.log(req.params.courseId);
  const result = await courseService.getCourseReviewsFromDB(
    req.params.courseId,
  );

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Course and Reviews retrieved successfully',
    data: result,
  });
});

const getBestCourse = catchAsync(async (req, res) => {
  // console.log(req.params.courseId);
  const result = await courseService.getBestCourseFromDB();

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Best course retrieved successfully',
    data: result,
  });
});

export const courseController = {
  createCourse,
  getCourses,
  getCourseReviews,
  getBestCourse,
};
