from time import localtime, strftime
import httplib2

class My_logger(object):
	time = strftime("%Y-%m-%dT%H:%M:%S+00:00", localtime())		

	def log(self, level, message):
		self.level = level
		self.message = message
		self.result = ""

		if self.level == 1:
			self.result += "INFO"
		elif self.level == 2:
			self.result += "WARNING"
		elif self.level == 3:
			self.result += "PLSCHECKFFS"
		self.result += "::" + self.time + "::" + self.message
		
		return self.result

class Console_logger(My_logger):
	def log(self, level, message):
		print super(Console_logger, self).log(level, message)

class File_logger(My_logger):
	def log(self, level, message):
		self.file_to_write = open("file_to_write.txt", "w")
		self.file_to_write.write(super(File_logger, self).log(level, message))
		self.file_to_write.close()

class HTTP_logger(My_logger):
	def log(self, level, message):
		self.message_to_send = super(HTTP_logger, self).log(level, message)

		h = httplib2.Http()
		(resp, content) = h.request("http://requestb.in/oyprrsoy","POST", body= self.message_to_send, headers={'content-type':'text/plain'} )
		
		# Prints the response
		for i in resp:
			print i + ": " + resp[i]



logger1 = File_logger()
logger1.log(1, "This is an INFO Message for the File Logger")


logger2 = Console_logger()
logger2.log(2, "This is a WARNING Message for the Console Logger")
print

logger3 = HTTP_logger()
logger3.log(3, "This is a PLSCHECKFFS Message for the HTTP Logger")
print
